import { NumberMgt } from '../utils/numberMgt';
import { Monster, MonsterName, monsters } from './monsters';

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
      const getLevel = () => NumberMgt.random(1, 3);

      return [
         monsters['enemy-red-slime']()({ level: getLevel() }),
         ...Array.from({ length: monstersCount }).map(() =>
            monsters['enemy-green-slime']()({ level: getLevel() }),
         ),
      ];
   }

   if (monsterGroupId === 3) {
      const monstersCount = NumberMgt.random(1, 2);
      const getLevel = () => NumberMgt.random(1, 3);

      return [
         monsters['enemy-blue-slime']()({ level: getLevel() }),
         ...Array.from({ length: monstersCount }).map(() =>
            monsters['enemy-green-slime']()({ level: getLevel() }),
         ),
      ];
   }

   if (monsterGroupId === 4) {
      const monstersCount = NumberMgt.random(1, 3);
      const getLevel = () => NumberMgt.random(2, 5);
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

   throw new Error(`Unknown monsterGroupId: '${monsterGroupId}'`);
};
