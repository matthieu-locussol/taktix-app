import type { Item } from '../types/Item.ts';
import type { RealStatistic, Statistic, Statistics } from '../types/Statistic.ts';

import { DEFAULT_HEALTH, STATISTICS_POINTS_PER_LEVEL } from '../config.ts';
import { getTalents } from '../data/talents.ts';
import { ProfessionType } from '../types/Profession.ts';
import { statistics as allStatistics, isStatistic } from '../types/Statistic.ts';

import { LevelMgt } from './levelMgt.ts';
import { NumberMgt } from './numberMgt.ts';

export namespace StatisticMgt {
   export const BASE_INITIATIVE = 100;

   export const MAX_RESISTANCE_PERCENT = 50;

   export const STATISTICS_WITH_DECIMALS: Statistic[] = [
      'thornsMagical_+%',
      'thornsPhysical_+%',
      'thornsMagical_-%',
      'thornsPhysical_-%',
   ];

   export const DEFAULT_CHARACTER_STATISTICS = (): Statistics =>
      StatisticMgt.makeMockedStatistics({
         'vitality_+f': DEFAULT_HEALTH,
         'precision_+f': 15,
         'evasion_+f': 15,
         'criticalStrikeDamages_+%': 50,
         'prospect_+f': 30,
      });

   export const LEVEL_UP_STATISTICS = (): Record<ProfessionType, Statistics> => ({
      [ProfessionType.Warrior]: StatisticMgt.makeMockedStatistics({
         'vitality_+f': 12,
         'precision_+f': 1,
      }),
      [ProfessionType.Mage]: StatisticMgt.makeMockedStatistics({
         'vitality_+f': 12,
         'precision_+f': 1,
      }),
      [ProfessionType.Archer]: StatisticMgt.makeMockedStatistics({
         'vitality_+f': 12,
         'precision_+f': 1,
      }),
   });

   export const aggregateStatistics = (
      baseStatistics: Statistics,
      experience: number,
      profession: ProfessionType,
      talents: number[],
      items: Item[],
   ): Statistics =>
      StatisticMgt.mergeStatistics(
         baseStatistics,
         DEFAULT_CHARACTER_STATISTICS(),
         ...new Array(LevelMgt.getLevel(experience) - 1).fill(LEVEL_UP_STATISTICS()[profession]),
         ...talents.map((talent) => getTalents()[talent].statistics),
         StatisticMgt.mergeStatistics(
            ...items.map(({ baseAffixes, prefixes, suffixes }) => {
               return StatisticMgt.mergeStatistics(
                  ...baseAffixes.map((base) => StatisticMgt.makeMockedStatistics(base.statistics)),
                  ...prefixes.map((prefix) => StatisticMgt.makeMockedStatistics(prefix.statistics)),
                  ...suffixes.map((suffix) => StatisticMgt.makeMockedStatistics(suffix.statistics)),
               );
            }),
         ),
      );

   export const computeRealStatistics = (statistics: Statistics): Record<RealStatistic, number> => {
      const vitality = computeVitality(statistics);
      const magicShield = computeMagicShield(statistics);
      const strength = computeAttribute('strength', statistics);
      const dexterity = computeAttribute('dexterity', statistics);
      const intelligence = computeAttribute('intelligence', statistics);
      const luck = computeAttribute('luck', statistics);

      const initiative = computeInitiative(statistics);
      const precision = computePrecision(statistics);
      const evasion = computeEvasion(statistics);

      const lifeSteal = computeLifeSteal(statistics);
      const lifeStealPercent = computeLifeStealPercent(statistics);
      const areaOfEffect = computeAreaOfEffect(statistics);

      const earthDamages = computeElementalDamages('earthDamages', statistics);
      const windDamages = computeElementalDamages('windDamages', statistics);
      const fireDamages = computeElementalDamages('fireDamages', statistics);
      const iceDamages = computeElementalDamages('iceDamages', statistics);

      const criticalStrikeChance = computeCriticalStrikeChance(statistics);
      const criticalStrikeChancePercent = computeCriticalStrikeChancePercent(statistics);
      const criticalStrikeDamages = computeCriticalStrikeDamages(statistics);
      const criticalStrikeResistance = computeCriticalStrikeResistance(statistics);

      const earthResistance = computeElementalResistance('earthResistance', statistics);
      const earthResistancePercent = computeElementalResistancePercent(
         'earthResistance',
         statistics,
      );
      const windResistance = computeElementalResistance('windResistance', statistics);
      const windResistancePercent = computeElementalResistancePercent('windResistance', statistics);
      const fireResistance = computeElementalResistance('fireResistance', statistics);
      const fireResistancePercent = computeElementalResistancePercent('fireResistance', statistics);
      const iceResistance = computeElementalResistance('iceResistance', statistics);
      const iceResistancePercent = computeElementalResistancePercent('iceResistance', statistics);

      const sword1HDamages = computeWeaponDamages('sword1H', statistics);
      const axe1HDamages = computeWeaponDamages('axe1H', statistics);
      const mace1HDamages = computeWeaponDamages('mace1H', statistics);
      const daggerDamages = computeWeaponDamages('dagger', statistics);
      const wandDamages = computeWeaponDamages('wand', statistics);
      const sword2HDamages = computeWeaponDamages('sword2H', statistics);
      const axe2HDamages = computeWeaponDamages('axe2H', statistics);
      const mace2HDamages = computeWeaponDamages('mace2H', statistics);
      const bowDamages = computeWeaponDamages('bow', statistics);
      const staffDamages = computeWeaponDamages('staff', statistics);

      const thornsPhysical = computeThornsDamages('thornsPhysical', statistics);
      const thornsMagical = computeThornsDamages('thornsMagical', statistics);

      const prospect = computeProspect(statistics);

      return {
         vitality,
         magicShield,
         strength,
         dexterity,
         intelligence,
         luck,
         earthDamages,
         windDamages,
         fireDamages,
         iceDamages,
         sword1HDamages,
         axe1HDamages,
         mace1HDamages,
         daggerDamages,
         wandDamages,
         sword2HDamages,
         axe2HDamages,
         mace2HDamages,
         bowDamages,
         staffDamages,
         earthResistance,
         earthResistancePercent,
         windResistance,
         windResistancePercent,
         fireResistance,
         fireResistancePercent,
         iceResistance,
         iceResistancePercent,
         lifeSteal,
         lifeStealPercent,
         precision,
         evasion,
         prospect,
         initiative,
         thornsPhysical,
         thornsMagical,
         areaOfEffect,
         criticalStrikeResistance,
         criticalStrikeChance,
         criticalStrikeChancePercent,
         criticalStrikeDamages,
      };
   };

   export const computeAttribute = (
      attribute: 'strength' | 'dexterity' | 'intelligence' | 'luck',
      statistics: Statistics,
   ) =>
      computeTotalStatistic(
         statistics[`${attribute}_+f`] + statistics['allAttributes_+f'],
         statistics[`${attribute}_+%`] + statistics['allAttributes_+%'],
         statistics[`${attribute}_+x%`] + statistics['allAttributes_+x%'],
         statistics[`${attribute}_-f`] + statistics['allAttributes_-f'],
         statistics[`${attribute}_-%`] + statistics['allAttributes_-%'],
         statistics[`${attribute}_-x%`] + statistics['allAttributes_-x%'],
      );

   export const computeVitality = (statistics: Statistics): number =>
      computeTotalStatistic(
         statistics['vitality_+f'],
         statistics['vitality_+%'],
         statistics['vitality_+x%'],
         statistics['vitality_-f'],
         statistics['vitality_-%'],
         statistics['vitality_-x%'],
      ) + Math.floor(computeAttribute('strength', statistics) / 5);

   export const computeMagicShield = (statistics: Statistics): number =>
      computeTotalStatistic(
         statistics['magicShield_+f'],
         statistics['magicShield_+%'],
         statistics['magicShield_+x%'],
         statistics['magicShield_-f'],
         statistics['magicShield_-%'],
         statistics['magicShield_-x%'],
      ) + Math.floor(computeAttribute('intelligence', statistics) / 5);

   export const computeElementalDamages = (
      elementalDamages: 'earthDamages' | 'windDamages' | 'fireDamages' | 'iceDamages',
      statistics: Statistics,
   ) =>
      computeTotalStatistic(
         statistics[`${elementalDamages}_+f`] + statistics['elementalDamages_+f'],
         statistics[`${elementalDamages}_+%`] + statistics['elementalDamages_+%'],
         statistics[`${elementalDamages}_+x%`] + statistics['elementalDamages_+x%'],
         statistics[`${elementalDamages}_-f`] + statistics['elementalDamages_-f'],
         statistics[`${elementalDamages}_-%`] + statistics['elementalDamages_-%'],
         statistics[`${elementalDamages}_-x%`] + statistics['elementalDamages_-x%'],
      );

   export const computeWeaponDamages = (
      weapon:
         | 'sword1H'
         | 'axe1H'
         | 'mace1H'
         | 'dagger'
         | 'wand'
         | 'sword2H'
         | 'axe2H'
         | 'mace2H'
         | 'bow'
         | 'staff',
      statistics: Statistics,
   ) =>
      computeTotalStatistic(
         statistics[`${weapon}Damages_+f`],
         statistics[`${weapon}Damages_+%`],
         statistics[`${weapon}Damages_+x%`],
         statistics[`${weapon}Damages_-f`],
         statistics[`${weapon}Damages_-%`],
         statistics[`${weapon}Damages_-x%`],
      );

   export const computeElementalResistance = (
      elementalResistance:
         | 'earthResistance'
         | 'windResistance'
         | 'fireResistance'
         | 'iceResistance',
      statistics: Statistics,
   ) => {
      const resistance =
         statistics[`${elementalResistance}_+f`] +
         statistics['elementalResistances_+f'] -
         statistics[`${elementalResistance}_-f`] -
         statistics['elementalResistances_-f'];

      return resistance;
   };

   export const computeElementalResistancePercent = (
      elementalResistance:
         | 'earthResistance'
         | 'windResistance'
         | 'fireResistance'
         | 'iceResistance',
      statistics: Statistics,
   ) => {
      const resistancePercent = Math.min(
         statistics[`${elementalResistance}_+%`] +
            statistics['elementalResistances_+%'] -
            statistics[`${elementalResistance}_-%`] -
            statistics['elementalResistances_-%'],
         MAX_RESISTANCE_PERCENT,
      );

      return resistancePercent;
   };

   export const computeLifeSteal = (statistics: Statistics) => {
      const lifeSteal = computeTotalStatistic(
         statistics['lifeSteal_+f'],
         0,
         0,
         statistics['lifeSteal_-f'],
         0,
         0,
      );

      return lifeSteal;
   };

   export const computeLifeStealPercent = (statistics: Statistics) => {
      const lifeStealPercent = statistics['lifeSteal_+%'] - statistics['lifeSteal_-%'];

      return NumberMgt.clamp(lifeStealPercent, 0, 100);
   };

   export const computePrecision = (statistics: Statistics) => {
      const precision = computeTotalStatistic(
         statistics['precision_+f'],
         statistics['precision_+%'],
         0,
         statistics['precision_-f'],
         statistics['precision_-%'],
         0,
      );

      return precision;
   };

   export const computeEvasion = (statistics: Statistics) => {
      const evasion =
         computeTotalStatistic(
            statistics['evasion_+f'],
            statistics['evasion_+%'],
            0,
            statistics['evasion_-f'],
            statistics['evasion_-%'],
            0,
         ) + Math.floor(computeAttribute('dexterity', statistics) / 5);

      return evasion;
   };

   export const computeProspect = (statistics: Statistics) => {
      const prospect =
         computeTotalStatistic(statistics['prospect_+f'], 0, 0, statistics['prospect_-f'], 0, 0) +
         Math.floor(computeAttribute('luck', statistics) / 5);

      return prospect;
   };

   export const computeInitiative = (statistics: Statistics) => {
      const initiative =
         BASE_INITIATIVE +
         computeTotalStatistic(
            statistics['initiative_+f'],
            0,
            0,
            statistics['initiative_-f'],
            0,
            0,
         ) +
         Math.floor(
            (computeAttribute('strength', statistics) +
               computeAttribute('dexterity', statistics) +
               computeAttribute('intelligence', statistics)) *
               0.5,
         );

      return initiative;
   };

   export const computeThornsDamages = (
      damages: 'thornsPhysical' | 'thornsMagical',
      statistics: Statistics,
   ) => {
      const thornsDamages = statistics[`${damages}_+%`] - statistics[`${damages}_-%`];

      return thornsDamages;
   };

   export const computeAreaOfEffect = (statistics: Statistics) => {
      const areaOfEffect = statistics['areaOfEffect_+%'] - statistics['areaOfEffect_-%'];

      return areaOfEffect;
   };

   export const computeCriticalStrikeResistance = (statistics: Statistics) => {
      const criticalStrikeResistance = computeTotalStatistic(
         statistics['criticalStrikeResistance_+f'],
         statistics['criticalStrikeResistance_+%'],
         0,
         statistics['criticalStrikeResistance_-f'],
         statistics['criticalStrikeResistance_-%'],
         0,
      );

      return criticalStrikeResistance;
   };

   export const computeCriticalStrikeChance = (statistics: Statistics) => {
      const criticalStrikeChance =
         statistics['criticalStrikeChance_+f'] - statistics['criticalStrikeChance_-f'];

      return criticalStrikeChance;
   };

   export const computeCriticalStrikeChancePercent = (statistics: Statistics) => {
      const criticalStrikeChancePercent =
         statistics['criticalStrikeChance_+%'] - statistics['criticalStrikeChance_-%'];

      return criticalStrikeChancePercent;
   };

   export const computeCriticalStrikeDamages = (statistics: Statistics) => {
      const criticalStrikeDamages =
         statistics['criticalStrikeDamages_+%'] - statistics['criticalStrikeDamages_-%'];

      return criticalStrikeDamages;
   };

   export const computeHitChance = (attackerPrecision: number, defenderEvasion: number): number => {
      const numerator = 1.25 * attackerPrecision;
      const denominator = attackerPrecision + (defenderEvasion * 0.2) ** 0.9;
      const result = denominator === 0 ? 0 : numerator / denominator;

      return Math.min(Math.max(result, 0.05), 1);
   };

   export const computeAreaOfEffectDamages = (
      finalDamages: number,
      increased: number,
      distanceFromTarget: number,
   ): number => {
      if (distanceFromTarget === 0) {
         return finalDamages;
      }

      return Math.floor(
         finalDamages * 0.5 * (1 + increased / 100) * Math.max(1 - distanceFromTarget * 0.25, 0),
      );
   };

   export const computeDamages = (
      weaponBaseMin: number,
      weaponBaseMax: number,
      weaponRealStatistic: number,
      realStatistic: number,
      defenderRealResistance: number,
      defenderRealResistancePercent: number,
      realCriticalStrikeChance: number,
      realCriticalStrikeChancePercent: number,
      realCriticalStrikeDamages: number,
      defenderRealCriticalResistance: number,
   ): {
      finalDamages: number;
      isCriticalStrike: boolean;
   } => {
      const weaponBaseRoll = NumberMgt.random(weaponBaseMin, weaponBaseMax);
      const weaponBaseDamages = weaponBaseRoll + weaponBaseRoll * (weaponRealStatistic / 100);
      const statisticDamages = weaponBaseDamages + weaponBaseDamages * (realStatistic / 100);

      const finalDamages = Math.floor(
         (statisticDamages - defenderRealResistance) * (1 - defenderRealResistancePercent / 100),
      );

      const criticalStrikeChance =
         (realCriticalStrikeChance * (1 + realCriticalStrikeChancePercent / 100)) / 100;
      const isCriticalStrike = Math.random() < criticalStrikeChance;

      if (isCriticalStrike) {
         const finalCriticalDamages = computeCriticalDamages(
            finalDamages,
            realCriticalStrikeDamages,
            defenderRealCriticalResistance,
         );

         return { finalDamages: finalCriticalDamages, isCriticalStrike };
      }

      return { finalDamages, isCriticalStrike };
   };

   export const computeCriticalDamages = (
      finalDamages: number,
      realCriticalStrikeDamages: number,
      defenderRealCriticalResistance: number,
   ): number => {
      const criticalStrikeDamages = finalDamages * (1 + realCriticalStrikeDamages / 100);

      return Math.floor(criticalStrikeDamages - defenderRealCriticalResistance);
   };

   export const computeLifeStolen = (
      damages: number,
      realLifeSteal: number,
      realLifeStealPercent: number,
      defenderVitality: number,
      defenderMagicShield: number,
   ): number => {
      const damagesAfterMagicShield = Math.max(damages - defenderMagicShield, 0);
      const lifeSteal = Math.min(
         realLifeSteal + realLifeStealPercent * damagesAfterMagicShield,
         damagesAfterMagicShield,
      );
      const lifeStolen = Math.min(lifeSteal, defenderVitality);

      return Math.floor(lifeStolen);
   };

   export const computeTotalStatistic = (
      added: number,
      increased: number,
      more: number,
      substracted: number,
      decreased: number,
      less: number,
   ): number =>
      Math.floor(
         added * (1 + (increased - decreased) / 100) * (1 + more / 100) * (1 - less / 100) -
            substracted,
      );

   export const mergeStatistics = (...statistics: Statistics[]): Statistics => {
      const result: Statistics = makeMockedStatistics({});

      statistics.forEach((statistic) => {
         allStatistics.forEach((key) => {
            if (key.endsWith('+x%') || key.endsWith('-x%')) {
               if (result[key] === 0) {
                  result[key] = statistic[key];
               } else {
                  result[key] = Math.floor(
                     ((1 + result[key] / 100) * (1 + statistic[key] / 100) - 1) * 100,
                  );
               }
            } else {
               result[key] += statistic[key];
            }
         });
      });

      return result;
   };

   export const isProgressionValid = (
      statistics: Partial<Statistics>,
      oldStatistics: Partial<Statistics>,
      oldStatisticsPoints: number,
      experience: number,
   ):
      | { valid: false }
      | {
           valid: true;
           remainingPoints: number;
        } => {
      const oldStatisticsPointsSpent = allStatistics.reduce(
         (acc, key) => acc + (oldStatistics[key] ?? 0),
         0,
      );
      const oldTotalPoints = oldStatisticsPoints + oldStatisticsPointsSpent;

      const statisticsPointsSpent = allStatistics.reduce(
         (acc, key) => acc + (statistics[key] ?? 0),
         0,
      );
      const remainingPoints = oldTotalPoints - statisticsPointsSpent;

      if (remainingPoints < 0) {
         return { valid: false };
      }

      const level = LevelMgt.getLevel(experience);

      if (statisticsPointsSpent + remainingPoints !== (level - 1) * STATISTICS_POINTS_PER_LEVEL) {
         return { valid: false };
      }

      return { valid: true, remainingPoints };
   };

   export const serializeStatistics = (statistics: Partial<Statistics>): string =>
      Object.entries(statistics)
         .map(([key, value]) => `${key}:${value}`)
         .join(',');

   export const deserializeStatistics = (serialized: string): Statistics => {
      const result: Statistics = makeMockedStatistics({});

      serialized.split(',').forEach((part) => {
         const [key, value] = part.split(':');

         if (isStatistic(key)) {
            result[key] = Number(value);
         }
      });

      return result;
   };

   export const makeMockedStatistics = (partial: Partial<Statistics>): Statistics => ({
      'vitality_+f': 0,
      'vitality_+%': 0,
      'vitality_+x%': 0,
      'vitality_-f': 0,
      'vitality_-%': 0,
      'vitality_-x%': 0,
      'magicShield_+f': 0,
      'magicShield_+%': 0,
      'magicShield_+x%': 0,
      'magicShield_-f': 0,
      'magicShield_-%': 0,
      'magicShield_-x%': 0,
      'strength_+f': 0,
      'strength_+%': 0,
      'strength_+x%': 0,
      'strength_-f': 0,
      'strength_-%': 0,
      'strength_-x%': 0,
      'dexterity_+f': 0,
      'dexterity_+%': 0,
      'dexterity_+x%': 0,
      'dexterity_-f': 0,
      'dexterity_-%': 0,
      'dexterity_-x%': 0,
      'intelligence_+f': 0,
      'intelligence_+%': 0,
      'intelligence_+x%': 0,
      'intelligence_-f': 0,
      'intelligence_-%': 0,
      'intelligence_-x%': 0,
      'luck_+f': 0,
      'luck_+%': 0,
      'luck_+x%': 0,
      'luck_-f': 0,
      'luck_-%': 0,
      'luck_-x%': 0,
      'allAttributes_+f': 0,
      'allAttributes_+%': 0,
      'allAttributes_+x%': 0,
      'allAttributes_-f': 0,
      'allAttributes_-%': 0,
      'allAttributes_-x%': 0,
      'earthDamages_+f': 0,
      'earthDamages_+%': 0,
      'earthDamages_+x%': 0,
      'earthDamages_-f': 0,
      'earthDamages_-%': 0,
      'earthDamages_-x%': 0,
      'windDamages_+f': 0,
      'windDamages_+%': 0,
      'windDamages_+x%': 0,
      'windDamages_-f': 0,
      'windDamages_-%': 0,
      'windDamages_-x%': 0,
      'fireDamages_+f': 0,
      'fireDamages_+%': 0,
      'fireDamages_+x%': 0,
      'fireDamages_-f': 0,
      'fireDamages_-%': 0,
      'fireDamages_-x%': 0,
      'iceDamages_+f': 0,
      'iceDamages_+%': 0,
      'iceDamages_+x%': 0,
      'iceDamages_-f': 0,
      'iceDamages_-%': 0,
      'iceDamages_-x%': 0,
      'elementalDamages_+f': 0,
      'elementalDamages_+%': 0,
      'elementalDamages_+x%': 0,
      'elementalDamages_-f': 0,
      'elementalDamages_-%': 0,
      'elementalDamages_-x%': 0,
      'sword1HDamages_+f': 0,
      'sword1HDamages_+%': 0,
      'sword1HDamages_+x%': 0,
      'sword1HDamages_-f': 0,
      'sword1HDamages_-%': 0,
      'sword1HDamages_-x%': 0,
      'axe1HDamages_+f': 0,
      'axe1HDamages_+%': 0,
      'axe1HDamages_+x%': 0,
      'axe1HDamages_-f': 0,
      'axe1HDamages_-%': 0,
      'axe1HDamages_-x%': 0,
      'mace1HDamages_+f': 0,
      'mace1HDamages_+%': 0,
      'mace1HDamages_+x%': 0,
      'mace1HDamages_-f': 0,
      'mace1HDamages_-%': 0,
      'mace1HDamages_-x%': 0,
      'daggerDamages_+f': 0,
      'daggerDamages_+%': 0,
      'daggerDamages_+x%': 0,
      'daggerDamages_-f': 0,
      'daggerDamages_-%': 0,
      'daggerDamages_-x%': 0,
      'wandDamages_+f': 0,
      'wandDamages_+%': 0,
      'wandDamages_+x%': 0,
      'wandDamages_-f': 0,
      'wandDamages_-%': 0,
      'wandDamages_-x%': 0,
      'sword2HDamages_+f': 0,
      'sword2HDamages_+%': 0,
      'sword2HDamages_+x%': 0,
      'sword2HDamages_-f': 0,
      'sword2HDamages_-%': 0,
      'sword2HDamages_-x%': 0,
      'axe2HDamages_+f': 0,
      'axe2HDamages_+%': 0,
      'axe2HDamages_+x%': 0,
      'axe2HDamages_-f': 0,
      'axe2HDamages_-%': 0,
      'axe2HDamages_-x%': 0,
      'mace2HDamages_+f': 0,
      'mace2HDamages_+%': 0,
      'mace2HDamages_+x%': 0,
      'mace2HDamages_-f': 0,
      'mace2HDamages_-%': 0,
      'mace2HDamages_-x%': 0,
      'bowDamages_+f': 0,
      'bowDamages_+%': 0,
      'bowDamages_+x%': 0,
      'bowDamages_-f': 0,
      'bowDamages_-%': 0,
      'bowDamages_-x%': 0,
      'staffDamages_+f': 0,
      'staffDamages_+%': 0,
      'staffDamages_+x%': 0,
      'staffDamages_-f': 0,
      'staffDamages_-%': 0,
      'staffDamages_-x%': 0,
      'criticalStrikeChance_+f': 0,
      'criticalStrikeChance_-f': 0,
      'criticalStrikeChance_+%': 0,
      'criticalStrikeChance_-%': 0,
      'criticalStrikeDamages_+%': 0,
      'criticalStrikeDamages_-%': 0,
      'lifeSteal_+f': 0,
      'lifeSteal_-f': 0,
      'lifeSteal_+%': 0,
      'lifeSteal_-%': 0,
      'thornsPhysical_+%': 0,
      'thornsPhysical_-%': 0,
      'thornsMagical_+%': 0,
      'thornsMagical_-%': 0,
      'areaOfEffect_+%': 0,
      'areaOfEffect_-%': 0,
      'precision_+f': 0,
      'precision_-f': 0,
      'precision_+%': 0,
      'precision_-%': 0,
      'earthResistance_+f': 0,
      'earthResistance_+%': 0,
      'earthResistance_-f': 0,
      'earthResistance_-%': 0,
      'windResistance_+f': 0,
      'windResistance_+%': 0,
      'windResistance_-f': 0,
      'windResistance_-%': 0,
      'fireResistance_+f': 0,
      'fireResistance_+%': 0,
      'fireResistance_-f': 0,
      'fireResistance_-%': 0,
      'iceResistance_+f': 0,
      'iceResistance_+%': 0,
      'iceResistance_-f': 0,
      'iceResistance_-%': 0,
      'elementalResistances_+f': 0,
      'elementalResistances_+%': 0,
      'elementalResistances_-f': 0,
      'elementalResistances_-%': 0,
      'criticalStrikeResistance_+f': 0,
      'criticalStrikeResistance_-f': 0,
      'criticalStrikeResistance_+%': 0,
      'criticalStrikeResistance_-%': 0,
      'evasion_+f': 0,
      'evasion_-f': 0,
      'evasion_+%': 0,
      'evasion_-%': 0,
      'prospect_+f': 0,
      'prospect_-f': 0,
      'initiative_+f': 0,
      'initiative_-f': 0,
      ...partial,
   });

   export const makeMockedRealStatistics = (
      partial: Partial<Record<RealStatistic, number>>,
   ): Record<RealStatistic, number> => ({
      areaOfEffect: 0,
      axe1HDamages: 0,
      axe2HDamages: 0,
      bowDamages: 0,
      criticalStrikeChance: 0,
      criticalStrikeChancePercent: 0,
      criticalStrikeDamages: 0,
      criticalStrikeResistance: 0,
      daggerDamages: 0,
      dexterity: 0,
      earthDamages: 0,
      earthResistance: 0,
      earthResistancePercent: 0,
      evasion: 0,
      fireDamages: 0,
      fireResistance: 0,
      fireResistancePercent: 0,
      iceDamages: 0,
      iceResistance: 0,
      iceResistancePercent: 0,
      initiative: StatisticMgt.BASE_INITIATIVE,
      intelligence: 0,
      lifeSteal: 0,
      lifeStealPercent: 0,
      luck: 0,
      mace1HDamages: 0,
      mace2HDamages: 0,
      magicShield: 0,
      precision: 0,
      prospect: 0,
      staffDamages: 0,
      strength: 0,
      sword1HDamages: 0,
      sword2HDamages: 0,
      thornsMagical: 0,
      thornsPhysical: 0,
      vitality: 0,
      wandDamages: 0,
      windDamages: 0,
      windResistance: 0,
      windResistancePercent: 0,
      ...partial,
   });
}
