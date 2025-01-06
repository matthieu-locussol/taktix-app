// This file has been automatically generated. DO NOT edit it manually.

import type { NPCSpot } from '../types/NPCSpot';
import type { Room } from '../types/Room';

import { Direction } from '../types/SceneData';

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
