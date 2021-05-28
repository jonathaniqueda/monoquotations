import { initializeApp } from './app';
import { Context } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';

const server = awsServerlessExpress.createServer(initializeApp());

export const handler = async (event: any, context: Context) => {
  return awsServerlessExpress.proxy(server, event, context);
};

export default {
  handler,
};
