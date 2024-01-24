import { Room } from '../types/Room';
import { Direction, SceneData } from '../types/SceneData';

export interface TeleportationSpot {
   x: number;
   y: number;
   destinationMapName: Room;
   destinationMapData: SceneData;
}

export const TELEPORTATION_SPOTS: Record<Room, TeleportationSpot[]> = {
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
      {
         x: 7,
         y: 3,
         destinationMapName: 'DungeonRoom',
         destinationMapData: {
            entrancePosition: { x: 334, y: 3 },
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
   DungeonRoom: [
      {
         x: 334,
         y: 2,
         destinationMapName: 'CloudsRoom',
         destinationMapData: {
            entrancePosition: { x: 7, y: 4 },
            entranceDirection: Direction.DOWN,
         },
      },
      {
         x: 335,
         y: 2,
         destinationMapName: 'CloudsRoom',
         destinationMapData: {
            entrancePosition: { x: 7, y: 4 },
            entranceDirection: Direction.DOWN,
         },
      },
   ],
};
