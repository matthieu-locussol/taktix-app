import { PvEFight, PvEFightParameters, PvEFightResults } from '../fights/PvEFight';

export namespace FightMgt {
   export const MAX_PVE_FIGHT_TURNS = 100;

   export const computePvEFight = (parameters: PvEFightParameters): PvEFightResults => {
      const fight = new PvEFight(parameters);
      return fight.run();
   };
}
