import { Monster } from '../data/monsters';
import { NumberMgt } from './numberMgt';

export namespace LootMgt {
   export const computeMoneyEarned = (monsters: Monster[]): number => {
      return monsters.reduce(
         (acc, monster) => acc + NumberMgt.random(monster.money.min, monster.money.max),
         0,
      );
   };
}
