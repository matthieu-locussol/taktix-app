import { RequestHandler } from 'express';
import { CommunitySchema } from 'shared';
import { usersMap } from '../rooms/utils/usersMap';
import { prisma } from '../utils/prisma';

export const communityRouter: RequestHandler = async (_, res) => {
   const usersInformations = await prisma.character.findMany({
      select: {
         name: true,
         profession: true,
         // level: true,
      },
      where: {
         name: {
            in: [...usersMap.entries()].map(([, { characterName }]) => characterName),
         },
      },
   });

   const payload: CommunitySchema = {
      players: usersInformations.map(({ name, profession }) => ({
         avatar: `/assets/professions/face/${profession}.png`,
         player: name,
         level: 1,
         class: 'Ranger',
      })),
   };

   res.send(payload);
};
