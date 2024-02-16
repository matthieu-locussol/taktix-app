import { RequestHandler } from 'express';
import { CommunitySchema } from 'shared';
import { usersMap } from '../rooms/utils/usersMap';
import { prisma } from '../utils/prisma';

export const communityRouter: RequestHandler = async (_, res) => {
   const usersInformations = await prisma.character.findMany({
      select: {
         name: true,
         // level: true,
         // class: true,
         // avatar: true,
      },
      where: {
         name: {
            in: [...usersMap.entries()].map(([, { characterName }]) => characterName),
         },
      },
   });

   const payload: CommunitySchema = {
      players: usersInformations.map(({ name }) => ({
         avatar: '/assets/characters/face_big.png',
         player: name,
         level: 1,
         class: 'Ranger',
      })),
   };

   res.send(payload);
};
