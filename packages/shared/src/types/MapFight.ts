import type { MonsterName } from '../data/monsters';

export interface MapFightData {
   fights: {
      fightsIds: number[];
      positionX: number;
      positionY: number;
      radius: number;
      name: MonsterName;
   }[];
   timeoutRegeneration: number;
}
