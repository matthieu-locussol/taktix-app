import type { NPC } from '../data/npcs.ts';
import type { Room } from './Room.ts';
import type { Direction } from './SceneData.ts';

export interface NPCSpot {
   x: number;
   y: number;
   direction: Direction;
   mapName: Room;
   npcName: NPC;
}
