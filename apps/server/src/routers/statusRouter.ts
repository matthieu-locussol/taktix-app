import { RequestHandler } from 'express';

export const statusRouter: RequestHandler = (_, res) => {
   res.send({ status: 'ok' });
};
