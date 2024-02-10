import { RequestHandler } from 'express';
import { prisma } from '../utils/prisma';

export const statusRouter: RequestHandler = async (_, res) => {
   const maintenance = await prisma.maintenance.findFirst({
      where: { done: false },
   });

   if (maintenance !== null) {
      res.send({ status: 'maintenance' });
   } else {
      res.send({ status: 'ok' });
   }
};
