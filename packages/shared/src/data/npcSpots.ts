// This file has been automatically generated. DO NOT edit it manually.

import { NPCSpot } from '../types/NPCSpot';
import type { Room } from '../types/Room';
import { Direction } from '../types/SceneData';

export const NPC_SPOTS: Record<Room, NPCSpot[]> = {
   AAA_InitialRoom: [],
   CloudsRoom: [
      {
         x: 14,
         y: 7,
         npcName: 'Akara',
         mapName: 'CloudsRoom',
         direction: Direction.DOWN,
      },
   ],
   DungeonRoom: [],
   ForestRoom: [],
   HouseRoom: [],
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
   MoonshadowInnRoom: [
      {
         x: 29,
         y: 26,
         npcName: 'Akara',
         mapName: 'MoonshadowInnRoom',
         direction: Direction.DOWN,
      },
   ],
};
