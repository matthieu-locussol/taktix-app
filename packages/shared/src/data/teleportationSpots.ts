// This file has been automatically generated. DO NOT edit it manually.

import type { Room } from '../types/Room';
import { Direction } from '../types/SceneData';
import type { TeleportationSpot } from '../types/TeleportationSpot';

export const TELEPORTATION_SPOTS: Record<Room, TeleportationSpot[]> = {
   AAA_InitialRoom: [],
   CloudsRoom: [
      {
         x: 12,
         y: 6,
         destinationMapName: 'HouseRoom',
         destinationMapData: {
            entranceDirection: Direction.UP,
            entrancePosition: {
               x: 8,
               y: 8,
            },
         },
      },
      {
         x: 7,
         y: 3,
         destinationMapName: 'DungeonRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 23,
               y: 3,
            },
         },
      },
   ],
   DungeonRoom: [
      {
         x: 23,
         y: 2,
         destinationMapName: 'CloudsRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 7,
               y: 4,
            },
         },
      },
      {
         x: 24,
         y: 2,
         destinationMapName: 'CloudsRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 7,
               y: 4,
            },
         },
      },
      {
         x: 6,
         y: 20,
         destinationMapName: 'ForestRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 29,
               y: 5,
            },
         },
      },
      {
         x: 7,
         y: 20,
         destinationMapName: 'ForestRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 30,
               y: 5,
            },
         },
      },
   ],
   ForestRoom: [
      {
         x: 29,
         y: 5,
         destinationMapName: 'DungeonRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 6,
               y: 21,
            },
         },
      },
      {
         x: 30,
         y: 5,
         destinationMapName: 'DungeonRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 7,
               y: 21,
            },
         },
      },
   ],
   HouseRoom: [
      {
         x: 8,
         y: 9,
         destinationMapName: 'CloudsRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 12,
               y: 7,
            },
         },
      },
      {
         x: 9,
         y: 9,
         destinationMapName: 'CloudsRoom',
         destinationMapData: {
            entranceDirection: Direction.DOWN,
            entrancePosition: {
               x: 12,
               y: 7,
            },
         },
      },
   ],
};
