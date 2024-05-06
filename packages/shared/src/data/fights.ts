import { NumberMgt } from '../utils/numberMgt';
import { Monster, monsters } from './monsters';

export const getMonstersInformations = (monsterGroupId: number): Monster[] => {
   if (monsterGroupId === 1) {
      const monstersCount = NumberMgt.random(1, 3);
      const getLevel = () => NumberMgt.random(1, 3);

      return Array.from({ length: monstersCount }).map(() =>
         monsters['enemy-nono']()({ level: getLevel() }),
      );
   }

   throw new Error(`Unknown monsterGroupId: '${monsterGroupId}'`);
};
