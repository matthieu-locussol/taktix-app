import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';
import { CharacterSprite } from './charactersSprites';

const npcs = ['Akara', 'Serge Dualé'] as const;

export const zNPC = ZodMgt.constructZodLiteralUnionType(npcs.map((npc) => z.literal(npc)));

export type NPC = (typeof npcs)[number];

export const isNPC = (value: unknown): value is NPC => zNPC.safeParse(value).success;

export interface NPCInformations {
   name: NPC;
   avatar: string;
   spritesheet: CharacterSprite;
}

export const NPCS: Record<NPC, NPCInformations> = {
   Akara: {
      name: 'Akara',
      avatar: 'akara.jpeg',
      spritesheet: 'Character_002',
   },
   'Serge Dualé': {
      name: 'Serge Dualé',
      avatar: 'serge.jpeg',
      spritesheet: 'Character_003',
   },
};
