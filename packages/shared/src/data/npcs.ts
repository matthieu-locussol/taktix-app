import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

const npcs = ['Akara', 'Serge Dualé'] as const;

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
   'Serge Dualé': {
      name: 'Serge Dualé',
      spritesheet: 2,
   },
};
