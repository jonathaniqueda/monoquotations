import express, { Request, Response } from 'express';
import Joi from 'joi';
import validateSchema from '@packages/schema-validator';
import { RedisCache } from '@packages/redis-client';
import settings from './settings';

export const initializeApp = () => {
  const app = express();

  app.use(express.json());

  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/', async (req: Request, res: Response) => {
    const { body } = req;
    const schema = Joi.object().keys({
      fromCurrency: Joi.string().required(),
      toCurrency: Joi.string().required(),
      quotation: Joi.number().required()
    });

    const errors = validateSchema(schema, body);

    if (errors) {
      res.status(400).json(errors);
      return;
    }

    try {
      const redisClient = new RedisCache({
        cache: settings.cache
      });
      await redisClient.set(
      `${body.fromCurrency}_${body.toCurrency}`, {
        fromCurrency: body.fromCurrency,
        toCurrency: body.toCurrency,
        quotation: body.quotation,
        changedAt: new Date()
      });

      console.info(`[INFO] Saved ${body.fromCurrency} / ${body.toCurrency}`);

      return res.status(201).send();
    } catch (err) {
      console.error(
        `[ERROR]: Error to store ${body.fromCurrency} / ${body.toCurrency}`,
        err
      );

      return res.status(400).json({
        error: true,
        stack: err,
      });
    }
  });

  return app;
};
