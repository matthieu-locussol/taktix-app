import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

const npcs = ['Akara', 'Deckard Jr.'] as const;

export const zNPC = ZodMgt.constructZodLiteralUnionType(npcs.map((npc) => z.literal(npc)));

export type NPC = (typeof npcs)[number];

export const isNPC = (value: unknown): value is NPC => zNPC.safeParse(value).success;

interface NPCInformations {
   name: NPC;
   spritesheet: number;
}

export const NPCS: Record<NPC, NPCInformations> = {
   Akara: {
      name: 'Akara',
      spritesheet: 1,
   },
   'Deckard Jr.': {
      name: 'Deckard Jr.',
      spritesheet: 2,
   },
};
