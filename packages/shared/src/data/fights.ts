import { NumberMgt } from '../utils/numberMgt';
import { Monster, monsters } from './monsters';

export const getMonstersInformations = (monsterGroupId: number): Monster[] => {
   if (monsterGroupId === 1) {
      const monstersCount = NumberMgt.random(1, 2);
      const getLevel = () => NumberMgt.random(1, 1);

      return Array.from({ length: monstersCount }).map(() =>
         monsters['enemy-nono']()({ level: getLevel() }),
      );
   }

   if (monsterGroupId === 2) {
      const monstersCount = NumberMgt.random(1, 3);
      const getLevel = () => NumberMgt.random(2, 4);

      return Array.from({ length: monstersCount }).map(() =>
         monsters['enemy-nono']()({ level: getLevel() }),
      );
   }

   if (monsterGroupId === 3) {
      const monstersCount = NumberMgt.random(2, 4);
      const getLevel = () => NumberMgt.random(3, 8);

      return Array.from({ length: monstersCount }).map(() =>
         monsters['enemy-nono']()({ level: getLevel() }),
      );
   }

   throw new Error(`Unknown monsterGroupId: '${monsterGroupId}'`);
};
