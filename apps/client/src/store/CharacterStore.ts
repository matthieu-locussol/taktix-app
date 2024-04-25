import type { Position } from 'grid-engine';
import { makeAutoObservable, runInAction } from 'mobx';
import { DEFAULT_HEALTH_REGEN_MS } from 'shared/src/config';
import { LEVEL_TO_EXPERIENCE } from 'shared/src/data/levels';
import { Player } from 'shared/src/types/Player';
import { ProfessionType } from 'shared/src/types/Profession';
import { Room } from 'shared/src/types/Room';
import { Statistics } from 'shared/src/types/Statistic';
import { LevelMgt } from 'shared/src/utils/levelMgt';
import { StatisticMgt } from 'shared/src/utils/statisticMgt';
import { Store } from './Store';

export class CharacterStore {
   private _store: Store;

   public map: Room = 'AAA_InitialRoom';

   public name: string = '';

   public profession: ProfessionType = ProfessionType.Warrior;

   public position: Position = { x: 0, y: 0 };

   public players: Player[] = [];

   public talents: number[] = [];

   public talentsPoints: number = 0;

   public baseStatistics: Statistics = StatisticMgt.makeMockedStatistics({});

   public baseStatisticsPoints: number = 0;

   public experience: number = 0;

   public currentHealth: number = 35;

   private _intervalTimeout: NodeJS.Timeout | null = null;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public setMap(map: Room) {
      this.map = map;
   }

   public setName(name: string) {
      this.name = name;
   }

   public setProfession(profession: ProfessionType) {
      this.profession = profession;
   }

   public setPosition(position: Position) {
      this.position = position;
   }

   public setPositionX(x: number) {
      this.position.x = x;
   }

   public setPositionY(y: number) {
      this.position.y = y;
   }

   public setPlayers(players: Player[]) {
      this.players = players;
   }

   public setTalents(talents: number[]) {
      this.talents = [...talents];
   }

   public setTalentsPoints(talentsPoints: number) {
      this.talentsPoints = talentsPoints;
   }

   public setBaseStatistics(baseStatistics: Statistics) {
      this.baseStatistics = { ...baseStatistics };
   }

   public setBaseStatisticsPoints(baseStatisticsPoints: number) {
      this.baseStatisticsPoints = baseStatisticsPoints;
   }

   public setExperience(experience: number) {
      this.experience = experience;
      this.regenLifeIfNeeded();
   }

   public setCurrentHealth(currentHealth: number) {
      this.currentHealth = currentHealth;
      this.regenLifeIfNeeded();
   }

   public get healthPercentage() {
      return (this.currentHealth / this.maxHealth) * 100;
   }

   public get maxHealth() {
      return StatisticMgt.computeVitality(this.statistics);
   }

   public get experiencePercentage() {
      return (
         ((this.experience - this.minExperience) / (this.maxExperience - this.minExperience)) * 100
      );
   }

   public get remainingExperience() {
      return this.maxExperience - this.experience;
   }

   public get minExperience() {
      return LEVEL_TO_EXPERIENCE[this.level];
   }

   public get maxExperience() {
      return LEVEL_TO_EXPERIENCE[this.level + 1];
   }

   public get level() {
      return LevelMgt.getLevel(this.experience);
   }

   public get statistics(): Statistics {
      return StatisticMgt.aggregateStatistics(
         this.baseStatistics,
         this.experience,
         this.profession,
      );
   }

   private regenLifeIfNeeded() {
      if (this._intervalTimeout) {
         return;
      }

      this._intervalTimeout = setInterval(() => {
         if (this._store.pveFightStore.fightOngoing) {
            if (this._intervalTimeout) {
               clearInterval(this._intervalTimeout);
               this._intervalTimeout = null;
            }
         } else {
            runInAction(() => {
               this.currentHealth = Math.min(this.currentHealth + 1, this.maxHealth);
            });

            if (this.currentHealth === this.maxHealth) {
               if (this._intervalTimeout) {
                  clearInterval(this._intervalTimeout);
                  this._intervalTimeout = null;
               }
            }
         }
      }, DEFAULT_HEALTH_REGEN_MS);
   }
}
