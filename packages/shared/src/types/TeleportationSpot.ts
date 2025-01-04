import type { Room } from './Room.ts';
import type { SceneData } from './SceneData.ts';

export interface TeleportationSpot {
   x: number;
   y: number;
   destinationMapName: Room;
   destinationMapData: SceneData;
}
