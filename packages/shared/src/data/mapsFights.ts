import type { Room } from '../types/Room';
import { MonsterName } from './monsters';
import { MonsterSprite } from './monstersSprites';

interface MapFightData {
   fights: {
      fightsIds: number[];
      positionX: number;
      positionY: number;
      radius: number;
      spritesheet: MonsterSprite;
      name: MonsterName;
   }[];
   maxFights: number;
   timeoutRegeneration: number;
}

export const mapsFights: Partial<Record<Room, MapFightData>> = {
   MoonshadowHamletRoom: {
      fights: [
         {
            fightsIds: [1],
            positionX: 31,
            positionY: 38,
            radius: 1,
            spritesheet: 'Enemy_008',
            name: 'enemy-nono',
         },
         {
            fightsIds: [1],
            positionX: 24,
            positionY: 38,
            radius: 3,
            spritesheet: 'Enemy_010',
            name: 'enemy-nono',
         },
      ],
      maxFights: 3,
      timeoutRegeneration: 1000 * 60 * 1,
   },
};
