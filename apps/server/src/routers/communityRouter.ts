import type { RequestHandler } from 'express';
import type { CommunitySchema } from 'shared/src/schemas/CommunitySchema.ts';

import { zCharacterSprite } from 'shared/src/data/charactersSprites.ts';
import { zProfessionType } from 'shared/src/types/Profession.ts';
import { LevelMgt } from 'shared/src/utils/levelMgt.ts';

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
