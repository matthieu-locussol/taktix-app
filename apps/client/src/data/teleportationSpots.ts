import { Direction } from 'grid-engine';
import type { SceneData } from '../game/Scene';

export interface TeleportationSpot {
   x: number;
   y: number;
   destinationMapName: string;
   destinationMapData: SceneData;
}

export const TELEPORTATION_SPOTS: Record<string, TeleportationSpot[]> = {
   clouds: [
      {
         x: 12,
         y: 6,
         destinationMapName: 'house',
         destinationMapData: {
            entrancePosition: { x: 8, y: 8 },
            entranceDirection: Direction.UP,
         },
      },
   ],
   house: [
      {
         x: 8,
         y: 9,
         destinationMapName: 'clouds',
         destinationMapData: {
            entrancePosition: { x: 12, y: 7 },
            entranceDirection: Direction.DOWN,
         },
      },
      {
         x: 9,
         y: 9,
         destinationMapName: 'clouds',
         destinationMapData: {
            entrancePosition: { x: 12, y: 7 },
            entranceDirection: Direction.DOWN,
         },
      },
   ],
};
