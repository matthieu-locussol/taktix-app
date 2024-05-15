import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';
import { CharacterSprite } from './charactersSprites';

const npcs = ['Nono'] as const;

export const zNPC = ZodMgt.constructZodLiteralUnionType(npcs.map((npc) => z.literal(npc)));

export type NPC = (typeof npcs)[number];

export const isNPC = (value: unknown): value is NPC => zNPC.safeParse(value).success;

export interface NPCInformations {
   name: NPC;
   avatar: string;
   spritesheet: CharacterSprite;
}

export const NPCS: Record<NPC, NPCInformations> = {
   Nono: {
      name: 'Nono',
      avatar: 'nono.png',
      spritesheet: 'Character_038',
   },
};
