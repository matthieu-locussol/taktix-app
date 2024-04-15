import { makeAutoObservable } from 'mobx';
import { PvEFightResults } from 'shared/src/types/PvEFight';
import { _assert } from 'shared/src/utils/_assert';

type PvEFightMode = 'fight' | 'spectate';

export class PvEFightStore {
   private _fightResults: PvEFightResults | null = null;

   mode: PvEFightMode = 'fight';

   isFightResultsMenuOpened = false;

   constructor() {
      makeAutoObservable(this);
   }

   public setFightResults(fightResults: PvEFightResults): void {
      this._fightResults = fightResults;
      this.closeFightResults();
   }

   public setMode(mode: PvEFightMode): void {
      this.mode = mode;
   }

   public openFightResults(): void {
      this.isFightResultsMenuOpened = true;
   }

   public closeFightResults(): void {
      this.isFightResultsMenuOpened = false;
   }

   public get fightResults(): PvEFightResults {
      _assert(this._fightResults, 'fightResults should be defined');
      return this._fightResults;
   }

   public get initialConditions(): Record<number, PvEFightResults['initialConditions'][number]> {
      return this.fightResults.initialConditions.reduce(
         (acc, { fighterId, health, magicShield, maxHealth, maxMagicShield }) => ({
            ...acc,
            [fighterId]: { health, magicShield, maxHealth, maxMagicShield },
         }),
         {},
      );
   }
}
