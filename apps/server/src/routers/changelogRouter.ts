import { RequestHandler } from 'express';
import { ChangelogResults } from 'shared';
import { prisma } from '../utils/prisma';

export const changelogRouter: RequestHandler = async (_, res) => {
   const changelogs = await prisma.changelog.findMany({
      orderBy: {
         date: 'desc',
      },
      take: 10,
   });

   const result: ChangelogResults = {
      changelogs: changelogs.map((changelog) => ({
         id: changelog.id,
         date: changelog.date.toISOString(),
         text: changelog.text,
      })),
   };

   res.send(result);
};
