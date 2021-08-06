import env from 'env-var';

import { name, version } from './package.json';
const required = process.env.NODE_ENV !== 'test';

const settings = Object.freeze({
  name,
  version,
  description: '',
  env: env.get('NODE_ENV').asString(),
  port: env.get('DOJO_SET_QUOTATION_API_PORT').required(required).asIntPositive(),
  host: env.get('DOJO_SET_QUOTATION_API_HOST').required(required).asString(),
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  logs: {
    level: env.get('DOJO_SET_QUOTATION_LOG_LEVEL').required(required).asString(),
  },
  cache: {
    host: env.get('DOJO_SET_QUOTATION_REDIS_HOST').required(required).asString(),
    port: env.get('DOJO_SET_QUOTATION_REDIS_PORT').required(required).asInt(),
    ttl: env.get('DOJO_SET_QUOTATION_REDIS_TTL').required(required).asIntPositive(),
    quotationDb: env.get('DOJO_SET_QUOTATION_QUOTATION_REDIS_DB').required(required).asIntPositive(),
  },
  isProduction: process.env.NODE_ENV === 'production',
});

export default settings;