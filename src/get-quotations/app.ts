import express, { Request, Response } from 'express';
import { RedisCache } from '@packages/redis-client';
import { quotationKey }  from '@packages/utils';
import settings from './settings'

type getRequestQuotation = {
  fromCurrency: string,
  toCurrency: string,
}

export const initializeApp = () => {
  const app = express();

  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.get('/:fromCurrency/:toCurrency', async (req: Request<getRequestQuotation>, res: Response) => {
    const { params } = req;
    
    const redisClient = new RedisCache({
      cache: settings.cache
    });
    
    try {
      const quotation = await redisClient.get(quotationKey(params.fromCurrency, params.toCurrency));

      return res.json(quotation);
    } catch(err) {
      return res.status(404).json({
        error: true,
        stack: err,
      });
    }
  });

  return app;
};
