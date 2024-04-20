import { makeAutoObservable } from 'mobx';
import { ProfessionType } from 'shared/src/types/Profession';
import { PvEFightResults, PvEFighterSimplified } from 'shared/src/types/PvEFight';
import { _assert } from 'shared/src/utils/_assert';

type PvEFightMode = 'fight' | 'spectate';

export class PvEFightStore {
   private _fightResults: PvEFightResults | null = null;

   fightOngoing = false;

   currentTurn = 1;

   currentFighter = 1;

   mode: PvEFightMode = 'fight';

   isFightResultsMenuOpened = false;

   fightersHealth: Record<number, number> = {};

   fightersMagicShield: Record<number, number> = {};

   constructor() {
      makeAutoObservable(this);
   }

   public setFightResults(fightResults: PvEFightResults): void {
      this._fightResults = fightResults;
      this.closeFightResults();
   }

   public startFight(): void {
      this.fightOngoing = true;
   }

   public endFight(): void {
      this.fightOngoing = false;
   }

   public setCurrentTurn(currentTurn: number): void {
      this.currentTurn = currentTurn;
   }

   public setCurrentFighter(currentFighter: number): void {
      this.currentFighter = currentFighter;
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

   public setFighterHealth(fighterId: number, health: number): void {
      this.fightersHealth[fighterId] = health;
   }

   public setFighterMagicShield(fighterId: number, magicShield: number): void {
      this.fightersMagicShield[fighterId] = magicShield;
   }

   public get fightersOrder(): (PvEFighterSimplified & { name: string; avatar: string })[] {
      if (this._fightResults === null) {
         return [];
      }

      const names = this.fightResults.turns[0].fighters.map((fighter) => {
         if (fighter.type === 'ally') {
            const ally = this.fightResults.allies.find((ally) => ally.id === fighter.id);
            return ally?.name ?? 'Unknown';
         }

         const monster = this.fightResults.monsters.find((monster) => monster.id === fighter.id);
         return monster?.name ?? 'Unknown';
      });

      const avatars = this.fightResults.turns[0].fighters.map((fighter, index) => {
         if (fighter.type === 'ally') {
            const ally = this.fightResults.allies.find((ally) => ally.id === fighter.id);
            return `/assets/professions/face/${ally?.profession ?? ProfessionType.Warrior}.png`;
         }

         return `/assets/monsters/face/${names[index]}.png`;
      });

      return this.fightResults.turns[0].fighters.map((fighter, index) => ({
         ...fighter,
         name: names[index],
         avatar: avatars[index],
      }));
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
