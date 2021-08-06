import redis, { ClientOpts } from 'redis';
import { promisify } from 'util';

type ConnectionOptions = {
  cache: {
    port: number,
    host: string,
    db?: number,
    password?: string,
    ttl?: number
  }
}
type GetRedisClientOptions = Pick<ClientOpts, 'db'>;

const getRedisClient = (
  conn: ConnectionOptions,
  clientOpts: GetRedisClientOptions = {}
) => {
  const client = redis.createClient({
    host: conn.cache.host,
    port: conn.cache.port,
    db: conn.cache.db,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    no_ready_check: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    retry_strategy: (options) => {
      const oneHour = 1000 * 60 * 60;
      const fiveSeconds = 5000;

      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection');
      }

      if (options.total_retry_time > oneHour) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
      }

      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }

      // reconnect after
      return Math.min(options.attempt * 100, fiveSeconds);
    },
    ...clientOpts,
  });

  return {
    instance: client,
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
    del: promisify(client.del).bind(client),
  };
}

interface ICacheProvider {
  get<T = any>(key: string): Promise<T | null>;
  set(key: string, value: any, expiration?: number): Promise<any>;
  quit(): Promise<void>;
  del(key: string): Promise<boolean>;
}

class RedisCache implements ICacheProvider {
  client: any;

  constructor(
    conn: ConnectionOptions,
    params: GetRedisClientOptions = {}
  ) {
    this.client = getRedisClient(conn, params);

    if (this.client.instance.on) {
      this.client.instance.on('error', (err: Error) =>
        console.log('Error to start redis', err),
      );
    }
  }

  set(key: string, value: Record<string, unknown>) {
    return this.client.set(key, JSON.stringify(value));
  }

  async get(key: string) {
    try {
      const value = await this.client.get(key);
      const content = JSON.parse(value);

      return content;
    } catch (err) {
      return null;
    }
  }


  del(key: string) {
    return this.client.del(key);
  }

  async quit() {
    await this.client.instance.quit();
  }
}

export { RedisCache, ICacheProvider };
