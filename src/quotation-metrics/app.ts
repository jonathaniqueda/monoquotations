import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const initializeApp = () => {
  const app = express();

  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  return app;
};
