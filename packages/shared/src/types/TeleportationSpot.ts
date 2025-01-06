import type { Room } from './Room';
import type { SceneData } from './SceneData';

export interface TeleportationSpot {
   x: number;
   y: number;
   destinationMapName: Room;
   destinationMapData: SceneData;
}
