import { RequestHandler } from 'express';
import { StatusSchema } from 'shared';
import { prisma } from '../utils/prisma';

export const statusRouter: RequestHandler = async (_, res) => {
   const maintenance = await prisma.maintenance.findFirst({
      where: { done: false },
   });

   const payload: StatusSchema = {
      status: maintenance !== null ? 'maintenance' : 'online',
   };

   res.send(payload);
};
