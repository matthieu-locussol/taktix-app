// This file has been automatically generated. DO NOT edit it manually.

import type { NPCSpot } from '../types/NPCSpot.ts';
import type { Room } from '../types/Room.ts';

import { Direction } from '../types/SceneData.ts';

export const NPC_SPOTS: Record<Room, NPCSpot[]> = {
   AAA_InitialRoom: [],
   GraveyardRoom: [],
   MoonshadowBarRoom: [],
   MoonshadowHamletRoom: [
      {
         x: 26,
         y: 48,
         npcName: 'Nono',
         mapName: 'MoonshadowHamletRoom',
         direction: Direction.RIGHT,
      },
   ],
   MoonshadowHotelRoom: [],
   MoonshadowInnRoom: [],
   MoonshadowShopRoom: [],
};
