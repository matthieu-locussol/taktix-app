import { makeAutoObservable } from 'mobx';
import { PvEFightResults } from 'shared/src/types/PvEFight';

type PvEFightMode = 'fight' | 'spectate';

export class PvEFightStore {
   fightResults: PvEFightResults | null = null;

   mode: PvEFightMode = 'fight';

   isFightResultsMenuOpened = false;

   constructor() {
      makeAutoObservable(this);
   }

   public setFightResults(fightResults: PvEFightResults): void {
      this.fightResults = fightResults;
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
}
