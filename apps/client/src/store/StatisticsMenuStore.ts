import { makeAutoObservable } from 'mobx';
import { TranslationKey } from 'shared/src/data/translations';
import { Statistic, Statistics } from 'shared/src/types/Statistic';
import { StatisticMgt } from 'shared/src/utils/statisticMgt';
import { Store } from './Store';

export class StatisticsMenuStore {
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

   public showAdvanced: boolean = false;

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

   public setStatistics(statistics: Statistics): void {
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
   }

   public toggleAdvanced(): void {
      this.showAdvanced = !this.showAdvanced;
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

   public get statistics(): {
      icon: Statistic;
      value: number | string;
      label: TranslationKey;
      onIncrease?: () => void;
      onDecrease?: () => void;
      canIncrease?: boolean;
      canDecrease?: boolean;
      advanced: boolean;
   }[] {
      return [
         // Base statistics
         {
            icon: 'vitality_+f',
            value: `${this.vitality} (${StatisticMgt.computeVitality(this._store.characterStore.statistics)})`,
            label: 'vitality',
            onIncrease: () => this.increase('vitality'),
            onDecrease: () => this.decrease('vitality'),
            canIncrease: this.canIncrease,
            canDecrease: this.canDecrease.vitality,
            advanced: false,
         },
         {
            icon: 'magicShield_+f',
            value: `${this.magicShield} (${StatisticMgt.computeMagicShield(this._store.characterStore.statistics)})`,
            label: 'magicShield',
            onIncrease: () => this.increase('magicShield'),
            onDecrease: () => this.decrease('magicShield'),
            canIncrease: this.canIncrease,
            canDecrease: this.canDecrease.magicShield,
            advanced: false,
         },
         {
            icon: 'strength_+f',
            value: `${this.strength} (${StatisticMgt.computeAttribute('strength', this._store.characterStore.statistics)})`,
            label: 'strength',
            onIncrease: () => this.increase('strength'),
            onDecrease: () => this.decrease('strength'),
            canIncrease: this.canIncrease,
            canDecrease: this.canDecrease.strength,
            advanced: false,
         },
         {
            icon: 'dexterity_+f',
            value: `${this.dexterity} (${StatisticMgt.computeAttribute('dexterity', this._store.characterStore.statistics)})`,
            label: 'dexterity',
            onIncrease: () => this.increase('dexterity'),
            onDecrease: () => this.decrease('dexterity'),
            canIncrease: this.canIncrease,
            canDecrease: this.canDecrease.dexterity,
            advanced: false,
         },
         {
            icon: 'intelligence_+f',
            value: `${this.intelligence} (${StatisticMgt.computeAttribute('intelligence', this._store.characterStore.statistics)})`,
            label: 'intelligence',
            onIncrease: () => this.increase('intelligence'),
            onDecrease: () => this.decrease('intelligence'),
            canIncrease: this.canIncrease,
            canDecrease: this.canDecrease.intelligence,
            advanced: false,
         },
         {
            icon: 'luck_+f',
            value: `${this.luck} (${StatisticMgt.computeAttribute('luck', this._store.characterStore.statistics)})`,
            label: 'luck',
            onIncrease: () => this.increase('luck'),
            onDecrease: () => this.decrease('luck'),
            canIncrease: this.canIncrease,
            canDecrease: this.canDecrease.luck,
            advanced: false,
         },
         // Advanced statistics
         {
            icon: 'initiative_+f',
            value: StatisticMgt.computeInitiative(this._store.characterStore.statistics),
            label: 'initiative_+f',
            advanced: true,
         },
         {
            icon: 'precision_+f',
            value: StatisticMgt.computePrecision(this._store.characterStore.statistics),
            label: 'precision_+f',
            advanced: true,
         },
         {
            icon: 'evasion_+f',
            value: StatisticMgt.computeEvasion(this._store.characterStore.statistics),
            label: 'evasion_+f',
            advanced: true,
         },
         {
            icon: 'lifeSteal_+f',
            value: StatisticMgt.computeLifeSteal(this._store.characterStore.statistics),
            label: 'lifeSteal_+f',
            advanced: true,
         },
         {
            icon: 'areaOfEffect_+%',
            value: StatisticMgt.computeAreaOfEffect(this._store.characterStore.statistics),
            label: 'areaOfEffect_+%',
            advanced: true,
         },
         {
            icon: 'earthDamages_+f',
            value: StatisticMgt.computeElementalDamages(
               'earthDamages',
               this._store.characterStore.statistics,
            ),
            label: 'earthDamages_+f',
            advanced: true,
         },
         {
            icon: 'windDamages_+f',
            value: StatisticMgt.computeElementalDamages(
               'windDamages',
               this._store.characterStore.statistics,
            ),
            label: 'windDamages_+f',
            advanced: true,
         },
         {
            icon: 'fireDamages_+f',
            value: StatisticMgt.computeElementalDamages(
               'fireDamages',
               this._store.characterStore.statistics,
            ),
            label: 'fireDamages_+f',
            advanced: true,
         },
         {
            icon: 'iceDamages_+f',
            value: StatisticMgt.computeElementalDamages(
               'iceDamages',
               this._store.characterStore.statistics,
            ),
            label: 'iceDamages_+f',
            advanced: true,
         },
         {
            icon: 'criticalStrikeChance_+f',
            value: StatisticMgt.computeCriticalStrikeChance(this._store.characterStore.statistics),
            label: 'criticalStrikeChance_+f',
            advanced: true,
         },
         {
            icon: 'criticalStrikeChance_+%',
            value: StatisticMgt.computeCriticalStrikeChancePercent(
               this._store.characterStore.statistics,
            ),
            label: 'criticalStrikeChance_+%',
            advanced: true,
         },
         {
            icon: 'criticalStrikeDamages_+%',
            value: StatisticMgt.computeCriticalStrikeDamages(this._store.characterStore.statistics),
            label: 'criticalStrikeDamages_+%',
            advanced: true,
         },
         {
            icon: 'criticalStrikeResistance_+f',
            value: StatisticMgt.computeCriticalStrikeResistance(
               this._store.characterStore.statistics,
            ),
            label: 'criticalStrikeResistance_+f',
            advanced: true,
         },
         {
            icon: 'earthResistance_+f',
            value: StatisticMgt.computeElementalResistance(
               'earthResistance',
               this._store.characterStore.statistics,
            ),
            label: 'earthResistance_+f',
            advanced: true,
         },
         {
            icon: 'earthResistance_+%',
            value: StatisticMgt.computeElementalResistancePercent(
               'earthResistance',
               this._store.characterStore.statistics,
            ),
            label: 'earthResistance_+%',
            advanced: true,
         },
         {
            icon: 'windResistance_+f',
            value: StatisticMgt.computeElementalResistance(
               'windResistance',
               this._store.characterStore.statistics,
            ),
            label: 'windResistance_+f',
            advanced: true,
         },
         {
            icon: 'windResistance_+%',
            value: StatisticMgt.computeElementalResistancePercent(
               'windResistance',
               this._store.characterStore.statistics,
            ),
            label: 'windResistance_+%',
            advanced: true,
         },
         {
            icon: 'fireResistance_+f',
            value: StatisticMgt.computeElementalResistance(
               'fireResistance',
               this._store.characterStore.statistics,
            ),
            label: 'fireResistance_+f',
            advanced: true,
         },
         {
            icon: 'fireResistance_+%',
            value: StatisticMgt.computeElementalResistancePercent(
               'fireResistance',
               this._store.characterStore.statistics,
            ),
            label: 'fireResistance_+%',
            advanced: true,
         },
         {
            icon: 'iceResistance_+f',
            value: StatisticMgt.computeElementalResistance(
               'iceResistance',
               this._store.characterStore.statistics,
            ),
            label: 'iceResistance_+f',
            advanced: true,
         },
         {
            icon: 'iceResistance_+%',
            value: StatisticMgt.computeElementalResistancePercent(
               'iceResistance',
               this._store.characterStore.statistics,
            ),
            label: 'iceResistance_+%',
            advanced: true,
         },

         {
            icon: 'sword1HDamages_+f',
            value: StatisticMgt.computeWeaponDamages(
               'sword1H',
               this._store.characterStore.statistics,
            ),
            label: 'sword1HDamages_+f',
            advanced: true,
         },
         {
            icon: 'axe1HDamages_+f',
            value: StatisticMgt.computeWeaponDamages(
               'axe1H',
               this._store.characterStore.statistics,
            ),
            label: 'axe1HDamages_+f',
            advanced: true,
         },
         {
            icon: 'mace1HDamages_+f',
            value: StatisticMgt.computeWeaponDamages(
               'mace1H',
               this._store.characterStore.statistics,
            ),
            label: 'mace1HDamages_+f',
            advanced: true,
         },
         {
            icon: 'daggerDamages_+f',
            value: StatisticMgt.computeWeaponDamages(
               'dagger',
               this._store.characterStore.statistics,
            ),
            label: 'daggerDamages_+f',
            advanced: true,
         },
         {
            icon: 'wandDamages_+f',
            value: StatisticMgt.computeWeaponDamages('wand', this._store.characterStore.statistics),
            label: 'wandDamages_+f',
            advanced: true,
         },
         {
            icon: 'sword2HDamages_+f',
            value: StatisticMgt.computeWeaponDamages(
               'sword2H',
               this._store.characterStore.statistics,
            ),
            label: 'sword2HDamages_+f',
            advanced: true,
         },
         {
            icon: 'axe2HDamages_+f',
            value: StatisticMgt.computeWeaponDamages(
               'axe2H',
               this._store.characterStore.statistics,
            ),
            label: 'axe2HDamages_+f',
            advanced: true,
         },
         {
            icon: 'mace2HDamages_+f',
            value: StatisticMgt.computeWeaponDamages(
               'mace2H',
               this._store.characterStore.statistics,
            ),
            label: 'mace2HDamages_+f',
            advanced: true,
         },
         {
            icon: 'bowDamages_+f',
            value: StatisticMgt.computeWeaponDamages('bow', this._store.characterStore.statistics),
            label: 'bowDamages_+f',
            advanced: true,
         },
         {
            icon: 'staffDamages_+f',
            value: StatisticMgt.computeWeaponDamages(
               'staff',
               this._store.characterStore.statistics,
            ),
            label: 'staffDamages_+f',
            advanced: true,
         },
         {
            icon: 'thornsPhysical_+%',
            value: StatisticMgt.computeThornsDamages(
               'thornsPhysical',
               this._store.characterStore.statistics,
            ),
            label: 'thornsPhysical_+%',
            advanced: true,
         },
         {
            icon: 'thornsMagical_+%',
            value: StatisticMgt.computeThornsDamages(
               'thornsMagical',
               this._store.characterStore.statistics,
            ),
            label: 'thornsMagical_+%',
            advanced: true,
         },
         {
            icon: 'prospect_+f',
            value: StatisticMgt.computeProspect(this._store.characterStore.statistics),
            label: 'prospect_+f',
            advanced: true,
         },
      ];
   }
}
