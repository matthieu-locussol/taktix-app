import type { RequestHandler } from 'express';

import { zMaintenanceSchema } from 'shared';

import { notifyMaintenance } from '../rooms/ChatRoom.ts';
import { prisma } from '../utils/prisma.ts';

export const maintenanceRouter: RequestHandler = async (req, res) => {
   const { type, token } = zMaintenanceSchema.parse(req.body);

   if (token !== process.env.MAINTENANCE_TOKEN) {
      res.status(401).send({ error: 'Unauthorized' });

      return;
   }

   const maintenances = await prisma.maintenance.findMany({
      where: { done: false },
   });

   if (type === 'start' && maintenances.length === 0) {
      await prisma.maintenance.create();

      if (notifyMaintenance !== null) {
         notifyMaintenance();
      }
   } else if (type === 'end' && maintenances.length === 1) {
      await prisma.maintenance.update({
         where: { id: maintenances[0].id },
         data: { done: true },
      });
   } else {
      res.status(400).send({ error: 'Impossible to perform this action' });

      return;
   }

   res.status(200).send({ success: true });
};
