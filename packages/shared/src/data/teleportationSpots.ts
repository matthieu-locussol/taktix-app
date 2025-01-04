// This file has been automatically generated. DO NOT edit it manually.

import type { Room } from '../types/Room';
import type { TeleportationSpot } from '../types/TeleportationSpot';

import { Direction } from '../types/SceneData';

export const TELEPORTATION_SPOTS: Record<Room, TeleportationSpot[]> = {
   AAA_InitialRoom: [],
   GraveyardRoom: [
      {
         x: 14,
         y: 24,
         destinationMapName: 'MoonshadowHamletRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 46,
               y: 16,
            },
         },
      },
      {
         x: 15,
         y: 24,
         destinationMapName: 'MoonshadowHamletRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 47,
               y: 16,
            },
         },
      },
   ],
   MoonshadowBarRoom: [
      {
         x: 29,
         y: 23,
         destinationMapName: 'MoonshadowHamletRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 47,
               y: 41,
            },
         },
      },
      {
         x: 28,
         y: 23,
         destinationMapName: 'MoonshadowHamletRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 47,
               y: 41,
            },
         },
      },
   ],
   MoonshadowHamletRoom: [
      {
         x: 31,
         y: 32,
         destinationMapName: 'MoonshadowInnRoom',
         destinationMapData: {
            entranceDirection: Direction.UP,
            entrancePosition: {
               x: 30,
               y: 31,
            },
         },
      },
      {
         x: 47,
         y: 40,
         destinationMapName: 'MoonshadowBarRoom',
         destinationMapData: {
            entranceDirection: Direction.UP,
            entrancePosition: {
               x: 28,
               y: 22,
            },
         },
      },
      {
         x: 15,
         y: 31,
         destinationMapName: 'MoonshadowShopRoom',
         destinationMapData: {
            entranceDirection: Direction.LEFT,
            entrancePosition: {
               x: 26,
               y: 27,
            },
         },
      },
      {
         x: 46,
         y: 15,
         destinationMapName: 'GraveyardRoom',
         destinationMapData: {
            entranceDirection: Direction.UP,
            entrancePosition: {
               x: 14,
               y: 23,
            },
         },
      },
      {
         x: 47,
         y: 15,
         destinationMapName: 'GraveyardRoom',
         destinationMapData: {
            entranceDirection: Direction.UP,
            entrancePosition: {
               x: 15,
               y: 23,
            },
         },
      },
   ],
   MoonshadowHotelRoom: [
      {
         x: 24,
         y: 21,
         destinationMapName: 'MoonshadowInnRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 21,
               y: 27,
            },
         },
      },
   ],
   MoonshadowInnRoom: [
      {
         x: 30,
         y: 32,
         destinationMapName: 'MoonshadowHamletRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 31,
               y: 33,
            },
         },
      },
      {
         x: 29,
         y: 32,
         destinationMapName: 'MoonshadowHamletRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 31,
               y: 33,
            },
         },
      },
      {
         x: 31,
         y: 32,
         destinationMapName: 'MoonshadowHamletRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 31,
               y: 33,
            },
         },
      },
      {
         x: 21,
         y: 26,
         destinationMapName: 'MoonshadowHotelRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 24,
               y: 22,
            },
         },
      },
   ],
   MoonshadowShopRoom: [
      {
         x: 27,
         y: 27,
         destinationMapName: 'MoonshadowHamletRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 15,
               y: 32,
            },
         },
      },
   ],
};
