import { Direction, SceneData } from '../types/SceneData';

export interface TeleportationSpot {
   x: number;
   y: number;
   destinationMapName: string;
   destinationMapData: SceneData;
}

export const TELEPORTATION_SPOTS: Record<string, TeleportationSpot[]> = {
   CloudsRoom: [
      {
         x: 12,
         y: 6,
         destinationMapName: 'HouseRoom',
         destinationMapData: {
            entrancePosition: { x: 8, y: 8 },
            entranceDirection: Direction.UP,
         },
      },
   ],
   HouseRoom: [
      {
         x: 8,
         y: 9,
         destinationMapName: 'CloudsRoom',
         destinationMapData: {
            entrancePosition: { x: 12, y: 7 },
            entranceDirection: Direction.DOWN,
         },
      },
      {
         x: 9,
         y: 9,
         destinationMapName: 'CloudsRoom',
         destinationMapData: {
            entrancePosition: { x: 12, y: 7 },
            entranceDirection: Direction.DOWN,
         },
      },
   ],
};
