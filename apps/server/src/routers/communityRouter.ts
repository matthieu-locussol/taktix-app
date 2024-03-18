import { RequestHandler } from 'express';
import { CommunitySchema, LevelMgt } from 'shared';
import { usersMap } from '../rooms/utils/usersMap';
import { prisma } from '../utils/prisma';

export const communityRouter: RequestHandler = async (_, res) => {
   const usersInformations = await prisma.character.findMany({
      select: {
         name: true,
         profession: true,
         map: true,
         experience: true,
      },
      where: {
         name: {
            in: [...usersMap.entries()].map(([, { characterName }]) => characterName),
         },
      },
   });

   const payload: CommunitySchema = {
      players: usersInformations.map(({ name, profession, map, experience }) => ({
         avatar: `/assets/professions/face/${profession}.png`,
         player: name,
         level: LevelMgt.getLevel(experience),
         profession,
         map,
      })),
   };

   res.send(payload);
};
