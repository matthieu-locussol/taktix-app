import type { Monster, MonsterName } from './monsters';

import { NumberMgt } from '../utils/numberMgt';

import { monsters } from './monsters';

export const getMonstersInformations = (monsterGroupId: number): Monster[] => {
   if (monsterGroupId === 1) {
      const monstersCount = NumberMgt.random(1, 2);
      const getLevel = () => NumberMgt.random(1, 1);

      return Array.from({ length: monstersCount }).map(() =>
         monsters['enemy-green-slime']()({ level: getLevel() }),
      );
   }

   if (monsterGroupId === 2) {
      const monstersCount = NumberMgt.random(1, 2);
      const getLevel = () => NumberMgt.random(2, 4);

      return [
         monsters['enemy-red-slime']()({ level: getLevel() }),
         ...Array.from({ length: monstersCount }).map(() =>
            monsters['enemy-green-slime']()({ level: getLevel() }),
         ),
      ];
   }

   if (monsterGroupId === 3) {
      const monstersCount = NumberMgt.random(1, 2);
      const getLevel = () => NumberMgt.random(2, 4);

      return [
         monsters['enemy-blue-slime']()({ level: getLevel() }),
         ...Array.from({ length: monstersCount }).map(() =>
            monsters['enemy-green-slime']()({ level: getLevel() }),
         ),
      ];
   }

   if (monsterGroupId === 4) {
      const monstersCount = NumberMgt.random(1, 3);
      const getLevel = () => NumberMgt.random(3, 6);
      const getName = (): MonsterName =>
         (
            [
               'enemy-green-slime',
               'enemy-red-slime',
               'enemy-blue-slime',
               'enemy-pink-slime',
            ] as const
         )[NumberMgt.random(0, 3)];

      return [
         monsters['enemy-pink-slime']()({ level: getLevel() }),
         ...Array.from({ length: monstersCount }).map(() =>
            monsters[getName()]()({ level: getLevel() }),
         ),
      ];
   }

   if (monsterGroupId === 5) {
      const monstersCount = NumberMgt.random(1, 3);
      const getLevel = () => NumberMgt.random(6, 13);
      const getName = (): MonsterName =>
         (
            [
               'enemy-green-slime',
               'enemy-red-slime',
               'enemy-blue-slime',
               'enemy-pink-slime',
            ] as const
         )[NumberMgt.random(0, 3)];

      return [
         monsters['enemy-blue-slime']()({ level: getLevel() }),
         ...Array.from({ length: monstersCount }).map(() =>
            monsters[getName()]()({ level: getLevel() }),
         ),
      ];
   }

   if (monsterGroupId === 6) {
      const monstersCount = NumberMgt.random(1, 3);
      const getLevel = () => NumberMgt.random(6, 13);
      const getName = (): MonsterName =>
         (
            [
               'enemy-green-slime',
               'enemy-red-slime',
               'enemy-blue-slime',
               'enemy-pink-slime',
            ] as const
         )[NumberMgt.random(0, 3)];

      return [
         monsters['enemy-pink-slime']()({ level: getLevel() }),
         ...Array.from({ length: monstersCount }).map(() =>
            monsters[getName()]()({ level: getLevel() }),
         ),
      ];
   }

   if (monsterGroupId === 7) {
      const monstersCount = NumberMgt.random(1, 2);
      const getLevel = () => NumberMgt.random(7, 14);

      return [
         monsters['enemy-eyeboros']()({ level: getLevel() }),
         ...Array.from({ length: monstersCount }).map(() =>
            monsters['enemy-green-slime']()({ level: getLevel() }),
         ),
      ];
   }

   if (monsterGroupId === 8) {
      const monstersCount = NumberMgt.random(1, 3);
      const getLevel = () => NumberMgt.random(7, 11);

      return Array.from({ length: monstersCount }).map(() =>
         monsters['enemy-eyeboros']()({ level: getLevel() }),
      );
   }

   throw new Error(`Unknown monsterGroupId: '${monsterGroupId}'`);
};
