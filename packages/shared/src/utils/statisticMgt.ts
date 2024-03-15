import { Statistic, statistics as allStatistics } from '../types/Statistic';
import { NumberMgt } from './numberMgt';

export namespace StatisticMgt {
   export const BASE_INITIATIVE = 100;
   export const MAX_RESISTANCE_PERCENT = 50;

   export const computeRealStatistics = (statistics: Record<Statistic, number>) => {
      const strength = computeTotalStatistic(
         statistics['strength_+f'] + statistics['allAttributes_+f'],
         statistics['strength_+%'] + statistics['allAttributes_+%'],
         statistics['strength_+x%'] + statistics['allAttributes_+x%'],
         statistics['strength_-f'] + statistics['allAttributes_-f'],
         statistics['strength_-%'] + statistics['allAttributes_-%'],
         statistics['strength_-x%'] + statistics['allAttributes_-x%'],
      );

      const dexterity = computeTotalStatistic(
         statistics['dexterity_+f'] + statistics['allAttributes_+f'],
         statistics['dexterity_+%'] + statistics['allAttributes_+%'],
         statistics['dexterity_+x%'] + statistics['allAttributes_+x%'],
         statistics['dexterity_-f'] + statistics['allAttributes_-f'],
         statistics['dexterity_-%'] + statistics['allAttributes_-%'],
         statistics['dexterity_-x%'] + statistics['allAttributes_-x%'],
      );

      const intelligence = computeTotalStatistic(
         statistics['intelligence_+f'] + statistics['allAttributes_+f'],
         statistics['intelligence_+%'] + statistics['allAttributes_+%'],
         statistics['intelligence_+x%'] + statistics['allAttributes_+x%'],
         statistics['intelligence_-f'] + statistics['allAttributes_-f'],
         statistics['intelligence_-%'] + statistics['allAttributes_-%'],
         statistics['intelligence_-x%'] + statistics['allAttributes_-x%'],
      );

      const luck = computeTotalStatistic(
         statistics['luck_+f'] + statistics['allAttributes_+f'],
         statistics['luck_+%'] + statistics['allAttributes_+%'],
         statistics['luck_+x%'] + statistics['allAttributes_+x%'],
         statistics['luck_-f'] + statistics['allAttributes_-f'],
         statistics['luck_-%'] + statistics['allAttributes_-%'],
         statistics['luck_-x%'] + statistics['allAttributes_-x%'],
      );

      const vitality =
         computeTotalStatistic(
            statistics['vitality_+f'],
            statistics['vitality_+%'],
            statistics['vitality_+x%'],
            statistics['vitality_-f'],
            statistics['vitality_-%'],
            statistics['vitality_-x%'],
         ) + Math.floor(strength / 5);

      const magicShield =
         computeTotalStatistic(
            statistics['magicShield_+f'],
            statistics['magicShield_+%'],
            statistics['magicShield_+x%'],
            statistics['magicShield_-f'],
            statistics['magicShield_-%'],
            statistics['magicShield_-x%'],
         ) + Math.floor(intelligence / 5);

      const earthDamages = computeTotalStatistic(
         statistics['earthDamages_+f'],
         statistics['earthDamages_+%'],
         statistics['earthDamages_+x%'],
         statistics['earthDamages_-f'],
         statistics['earthDamages_-%'],
         statistics['earthDamages_-x%'],
      );

      const windDamage = computeTotalStatistic(
         statistics['windDamage_+f'],
         statistics['windDamage_+%'],
         statistics['windDamage_+x%'],
         statistics['windDamage_-f'],
         statistics['windDamage_-%'],
         statistics['windDamage_-x%'],
      );

      const fireDamages = computeTotalStatistic(
         statistics['fireDamages_+f'],
         statistics['fireDamages_+%'],
         statistics['fireDamages_+x%'],
         statistics['fireDamages_-f'],
         statistics['fireDamages_-%'],
         statistics['fireDamages_-x%'],
      );

      const iceDamages = computeTotalStatistic(
         statistics['iceDamages_+f'],
         statistics['iceDamages_+%'],
         statistics['iceDamages_+x%'],
         statistics['iceDamages_-f'],
         statistics['iceDamages_-%'],
         statistics['iceDamages_-x%'],
      );

      const elementalDamages = computeTotalStatistic(
         statistics['elementalDamages_+f'],
         statistics['elementalDamages_+%'],
         statistics['elementalDamages_+x%'],
         statistics['elementalDamages_-f'],
         statistics['elementalDamages_-%'],
         statistics['elementalDamages_-x%'],
      );

      const sword1HDamages = computeTotalStatistic(
         statistics['sword1HDamages_+f'],
         statistics['sword1HDamages_+%'],
         statistics['sword1HDamages_+x%'],
         statistics['sword1HDamages_-f'],
         statistics['sword1HDamages_-%'],
         statistics['sword1HDamages_-x%'],
      );

      const axe1HDamages = computeTotalStatistic(
         statistics['axe1HDamages_+f'],
         statistics['axe1HDamages_+%'],
         statistics['axe1HDamages_+x%'],
         statistics['axe1HDamages_-f'],
         statistics['axe1HDamages_-%'],
         statistics['axe1HDamages_-x%'],
      );

      const mace1HDamages = computeTotalStatistic(
         statistics['mace1HDamages_+f'],
         statistics['mace1HDamages_+%'],
         statistics['mace1HDamages_+x%'],
         statistics['mace1HDamages_-f'],
         statistics['mace1HDamages_-%'],
         statistics['mace1HDamages_-x%'],
      );

      const daggerDamages = computeTotalStatistic(
         statistics['daggerDamages_+f'],
         statistics['daggerDamages_+%'],
         statistics['daggerDamages_+x%'],
         statistics['daggerDamages_-f'],
         statistics['daggerDamages_-%'],
         statistics['daggerDamages_-x%'],
      );

      const wandDamages = computeTotalStatistic(
         statistics['wandDamages_+f'],
         statistics['wandDamages_+%'],
         statistics['wandDamages_+x%'],
         statistics['wandDamages_-f'],
         statistics['wandDamages_-%'],
         statistics['wandDamages_-x%'],
      );

      const sword2HDamages = computeTotalStatistic(
         statistics['sword2HDamages_+f'],
         statistics['sword2HDamages_+%'],
         statistics['sword2HDamages_+x%'],
         statistics['sword2HDamages_-f'],
         statistics['sword2HDamages_-%'],
         statistics['sword2HDamages_-x%'],
      );

      const axe2HDamages = computeTotalStatistic(
         statistics['axe2HDamages_+f'],
         statistics['axe2HDamages_+%'],
         statistics['axe2HDamages_+x%'],
         statistics['axe2HDamages_-f'],
         statistics['axe2HDamages_-%'],
         statistics['axe2HDamages_-x%'],
      );

      const mace2HDamages = computeTotalStatistic(
         statistics['mace2HDamages_+f'],
         statistics['mace2HDamages_+%'],
         statistics['mace2HDamages_+x%'],
         statistics['mace2HDamages_-f'],
         statistics['mace2HDamages_-%'],
         statistics['mace2HDamages_-x%'],
      );

      const bowDamages = computeTotalStatistic(
         statistics['bowDamages_+f'],
         statistics['bowDamages_+%'],
         statistics['bowDamages_+x%'],
         statistics['bowDamages_-f'],
         statistics['bowDamages_-%'],
         statistics['bowDamages_-x%'],
      );

      const staffDamages = computeTotalStatistic(
         statistics['staffDamages_+f'],
         statistics['staffDamages_+%'],
         statistics['staffDamages_+x%'],
         statistics['staffDamages_-f'],
         statistics['staffDamages_-%'],
         statistics['staffDamages_-x%'],
      );

      const earthResistance =
         statistics['earthResistance_+f'] +
         statistics['elementalDamages_+f'] -
         statistics['earthResistance_-f'] -
         statistics['elementalDamages_-f'];
      const earthResistancePercent = Math.min(
         statistics['earthResistance_+%'] +
            statistics['elementalDamages_+%'] -
            statistics['earthResistance_-%'] -
            statistics['elementalDamages_-%'],
         MAX_RESISTANCE_PERCENT,
      );

      const windResistance =
         statistics['windResistance_+f'] +
         statistics['elementalDamages_+f'] -
         statistics['windResistance_-f'] -
         statistics['elementalDamages_-f'];
      const windResistancePercent = Math.min(
         statistics['windResistance_+%'] +
            statistics['elementalDamages_+%'] -
            statistics['windResistance_-%'] -
            statistics['elementalDamages_-%'],
         MAX_RESISTANCE_PERCENT,
      );

      const fireResistance =
         statistics['fireResistance_+f'] +
         statistics['elementalDamages_+f'] -
         statistics['fireResistance_-f'] -
         statistics['elementalDamages_-f'];
      const fireResistancePercent = Math.min(
         statistics['fireResistance_+%'] +
            statistics['elementalDamages_+%'] -
            statistics['fireResistance_-%'] -
            statistics['elementalDamages_-%'],
         MAX_RESISTANCE_PERCENT,
      );

      const iceResistance =
         statistics['iceResistance_+f'] +
         statistics['elementalDamages_+f'] -
         statistics['iceResistance_-f'] -
         statistics['elementalDamages_-f'];
      const iceResistancePercent = Math.min(
         statistics['iceResistance_+%'] +
            statistics['elementalDamages_+%'] -
            statistics['iceResistance_-%'] -
            statistics['elementalDamages_-%'],
         MAX_RESISTANCE_PERCENT,
      );

      const lifeSteal = computeTotalStatistic(
         statistics['lifeSteal_+f'],
         statistics['lifeSteal_+%'],
         0,
         statistics['lifeSteal_-f'],
         statistics['lifeSteal_-%'],
         0,
      );

      const precision = computeTotalStatistic(
         statistics['precision_+f'],
         statistics['precision_+%'],
         0,
         statistics['precision_-f'],
         statistics['precision_-%'],
         0,
      );

      const evasion =
         computeTotalStatistic(
            statistics['evasion_+f'],
            statistics['evasion_+%'],
            0,
            statistics['evasion_-f'],
            statistics['evasion_-%'],
            0,
         ) + Math.floor(dexterity / 5);

      const prospect =
         computeTotalStatistic(statistics['prospect_+f'], 0, 0, statistics['prospect_-f'], 0, 0) +
         Math.floor(luck / 5);

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
         Math.floor((strength + dexterity + intelligence) * 0.5);

      const thornsPhysical = computeTotalStatistic(
         0,
         statistics['thornsPhysical_+%'],
         0,
         0,
         statistics['thornsPhysical_-%'],
         0,
      );

      const thornsMagical = computeTotalStatistic(
         0,
         statistics['thornsMagical_+%'],
         0,
         0,
         statistics['thornsMagical_-%'],
         0,
      );

      const areaOfEffect = computeTotalStatistic(
         0,
         statistics['areaOfEffect_+%'],
         0,
         0,
         statistics['areaOfEffect_-%'],
         0,
      );

      const criticalStrikeResistance = computeTotalStatistic(
         statistics['criticalStrikeResistance_+f'],
         statistics['criticalStrikeResistance_+%'],
         0,
         statistics['criticalStrikeResistance_-f'],
         statistics['criticalStrikeResistance_-%'],
         0,
      );

      const criticalStrikeChance =
         statistics['criticalStrikeChance_+f'] - statistics['criticalStrikeChance_-f'];
      const criticalStrikeChancePercent =
         statistics['criticalStrikeChance_+%'] - statistics['criticalStrikeChance_-%'];

      const criticalStrikeDamages = computeTotalStatistic(
         0,
         statistics['criticalStrikeDamages_+%'],
         0,
         0,
         statistics['criticalStrikeDamages_-%'],
         0,
      );

      return {
         vitality,
         magicShield,
         strength,
         dexterity,
         intelligence,
         luck,
         earthDamages,
         windDamage,
         fireDamages,
         iceDamages,
         elementalDamages,
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
      defenderRealCriticalResistancePercent: number,
   ): number => {
      const weaponBaseRoll = NumberMgt.random(weaponBaseMin, weaponBaseMax);
      const weaponBaseDamages = weaponBaseRoll + weaponBaseRoll * (weaponRealStatistic / 100);
      const statisticDamages = weaponBaseDamages + weaponBaseDamages * (realStatistic / 100);

      const finalDamages = Math.floor(
         (statisticDamages - defenderRealResistance) * (1 - defenderRealResistancePercent / 100),
      );

      const criticalStrikeChance =
         (realCriticalStrikeChance * (1 + realCriticalStrikeChancePercent / 100)) / 100;

      if (Math.random() < criticalStrikeChance) {
         return computeCriticalDamages(
            finalDamages,
            realCriticalStrikeDamages,
            defenderRealCriticalResistance,
            defenderRealCriticalResistancePercent,
         );
      }

      return finalDamages;
   };

   export const computeCriticalDamages = (
      finalDamages: number,
      realCriticalStrikeDamages: number,
      defenderRealCriticalResistance: number,
      defenderRealCriticalResistancePercent: number,
   ): number => {
      const criticalStrikeDamages = finalDamages * (1 + realCriticalStrikeDamages / 100);
      return Math.floor(
         (criticalStrikeDamages - defenderRealCriticalResistance) *
            (1 - defenderRealCriticalResistancePercent / 100),
      );
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

   export const mergeStatistics = (
      ...statistics: Record<Statistic, number>[]
   ): Record<Statistic, number> => {
      const result: Record<Statistic, number> = makeMockedStatistics({});

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

   export const makeMockedStatistics = (
      partial: Partial<Record<Statistic, number>>,
   ): Record<Statistic, number> => ({
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
      'windDamage_+f': 0,
      'windDamage_+%': 0,
      'windDamage_+x%': 0,
      'windDamage_-f': 0,
      'windDamage_-%': 0,
      'windDamage_-x%': 0,
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
      partial: Partial<ReturnType<(typeof StatisticMgt)['computeRealStatistics']>>,
   ): ReturnType<(typeof StatisticMgt)['computeRealStatistics']> => ({
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
      elementalDamages: 0,
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
      windDamage: 0,
      windResistance: 0,
      windResistancePercent: 0,
      ...partial,
   });
}
