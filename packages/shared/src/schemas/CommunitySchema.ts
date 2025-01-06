import { z } from 'zod';

import { zCharacterSprite } from '../data/charactersSprites';
import { zProfessionType } from '../types/Profession';

export const zCommunitySchema = z.object({
   players: z.array(
      z.object({
         player: z.string(),
         level: z.number(),
         profession: zProfessionType,
         spritesheet: zCharacterSprite,
         map: z.string(),
      }),
   ),
});

export type CommunitySchema = z.infer<typeof zCommunitySchema>;
