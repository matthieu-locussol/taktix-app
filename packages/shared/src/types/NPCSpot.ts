import { NPC } from '../data/npcs';
import type { Room } from './Room';
import { Direction } from './SceneData';

export interface NPCSpot {
   x: number;
   y: number;
   direction: Direction;
   mapName: Room;
   npcName: NPC;
}
