declare namespace Redis {
  export class RedisCache {
    set(key: string, value: Record<string, unknown>, expiration: number): Promise<any>;
    get(key: string): Promise<any>;
    del(key: string): Promise<any>;
    quit(): Promise<any>;
  }
}

export = Redis
