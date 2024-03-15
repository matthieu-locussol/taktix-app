import { makeAutoObservable } from 'mobx';
import { Statistic } from 'shared/src/types/Statistic';
import { StatisticMgt } from 'shared/src/utils/statisticMgt';
import { Store } from './Store';

export class StatisticsStore {
   private _boostableStatistics = [
      'vitality',
      'magicShield',
      'strength',
      'dexterity',
      'intelligence',
      'luck',
   ] as const;

   private _store: Store;

   public isOpened: boolean = false;

   public vitality: number = 0;

   public magicShield: number = 0;

   public strength: number = 0;

   public dexterity: number = 0;

   public intelligence: number = 0;

   public luck: number = 0;

   public statisticsPoints: number = 0;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public open(): void {
      this.isOpened = true;
   }

   public close(): void {
      this.isOpened = false;

      this.vitality = this._store.characterStore.baseStatistics['vitality_+f'];
      this.magicShield = this._store.characterStore.baseStatistics['magicShield_+f'];
      this.strength = this._store.characterStore.baseStatistics['strength_+f'];
      this.dexterity = this._store.characterStore.baseStatistics['dexterity_+f'];
      this.intelligence = this._store.characterStore.baseStatistics['intelligence_+f'];
      this.luck = this._store.characterStore.baseStatistics['luck_+f'];
      this.statisticsPoints = this._store.characterStore.baseStatisticsPoints;
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }

   public increase(statistic: (typeof this._boostableStatistics)[number]): void {
      if (this.statisticsPoints > 0) {
         this[statistic] += 1;
         this.statisticsPoints -= 1;
      }
   }

   public decrease(statistic: (typeof this._boostableStatistics)[number]): void {
      if (this[statistic] > 0) {
         this[statistic] -= 1;
         this.statisticsPoints += 1;
      }
   }

   public setStatisticsPoints(points: number): void {
      this.statisticsPoints = points;
   }

   public setStatistics(statistics: Record<Statistic, number>): void {
      this.vitality = statistics['vitality_+f'];
      this.magicShield = statistics['magicShield_+f'];
      this.strength = statistics['strength_+f'];
      this.dexterity = statistics['dexterity_+f'];
      this.intelligence = statistics['intelligence_+f'];
      this.luck = statistics['luck_+f'];
   }

   public save() {
      this._store.colyseusStore.updateStatistics({
         'vitality_+f': this.vitality,
         'magicShield_+f': this.magicShield,
         'strength_+f': this.strength,
         'dexterity_+f': this.dexterity,
         'intelligence_+f': this.intelligence,
         'luck_+f': this.luck,
      });

      this._store.characterStore.setBaseStatistics(
         StatisticMgt.makeMockedStatistics({
            'vitality_+f': this.vitality,
            'magicShield_+f': this.magicShield,
            'strength_+f': this.strength,
            'dexterity_+f': this.dexterity,
            'intelligence_+f': this.intelligence,
            'luck_+f': this.luck,
         }),
      );

      this._store.characterStore.setBaseStatisticsPoints(this.statisticsPoints);

      this.close();
   }

   public get canIncrease(): boolean {
      return this.statisticsPoints > 0;
   }

   public get canDecrease(): Record<(typeof this._boostableStatistics)[number], boolean> {
      return this._boostableStatistics.reduce(
         (acc, statistic) => ({
            ...acc,
            [statistic]: this[statistic] > 0,
         }),
         {} as Record<(typeof this._boostableStatistics)[number], boolean>,
      );
   }

   public get canSave(): boolean {
      return !(
         this.vitality === this._store.characterStore.baseStatistics['vitality_+f'] &&
         this.magicShield === this._store.characterStore.baseStatistics['magicShield_+f'] &&
         this.strength === this._store.characterStore.baseStatistics['strength_+f'] &&
         this.dexterity === this._store.characterStore.baseStatistics['dexterity_+f'] &&
         this.intelligence === this._store.characterStore.baseStatistics['intelligence_+f'] &&
         this.luck === this._store.characterStore.baseStatistics['luck_+f']
      );
   }
}
