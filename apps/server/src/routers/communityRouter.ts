import type { RequestHandler } from 'express';
import type { CommunitySchema } from 'shared';

import { LevelMgt, zCharacterSprite, zProfessionType } from 'shared';

import { usersMap } from '../rooms/utils/usersMap.ts';
import { prisma } from '../utils/prisma.ts';

export const communityRouter: RequestHandler = async (_, res) => {
   const usersInformations = await prisma.character.findMany({
      select: {
         name: true,
         spritesheet: true,
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
      players: usersInformations.map(({ name, spritesheet, profession, map, experience }) => ({
         spritesheet: zCharacterSprite.parse(spritesheet),
         player: name,
         level: LevelMgt.getLevel(experience),
         profession: zProfessionType.parse(profession),
         map,
      })),
   };

   res.send(payload);
};
