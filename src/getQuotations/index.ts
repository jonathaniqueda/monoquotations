// import logger from './logger';
// import initConfig from './client/ssm';
// import Entries from './config/enum';

export const handler = async (event: any): Promise<void> => {
  // logger().info('[info]: initializing...');

  // await initConfig(Object.values(Entries));
  // logger().info('[info]: config loaded');

  const app = await import('./app');

  return app.handler(event);
};

export default {
  handler,
};
