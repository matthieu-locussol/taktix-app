import { Statistics } from '../types/Statistic';

export namespace FightMgt {
   export const computeFight = (
      _player: { experience: number; statistics: Statistics },
      _allies: { experience: number; statistics: Statistics }[],
      _monsters: { level: number; experience: number; statistics: Statistics }[],
   ) => {};
}
