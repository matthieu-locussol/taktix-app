import { Monster, monsters } from './monsters';

export const getMonstersInformations = (monsterGroupId: number): Monster[] => {
   if (monsterGroupId === 1) {
      return [monsters['enemy-nono']({ level: 1 }), monsters['enemy-nono']({ level: 1 })];
   }

   throw new Error(`Unknown monsterGroupId: '${monsterGroupId}'`);
};
