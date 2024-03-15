import { describe, expect, it } from 'vitest';
import { StatisticMgt } from './statisticMgt';

describe('StatisticMgt', () => {
   describe('computeTotalStatistic', () => {
      const samples = [
         {
            added: 0,
            increased: 0,
            more: 0,
            substracted: 0,
            decreased: 0,
            less: 0,
            expected: 0,
         },
         {
            added: 5,
            increased: 0,
            more: 0,
            substracted: 0,
            decreased: 0,
            less: 0,
            expected: 5,
         },
         {
            added: 152,
            increased: 0,
            more: 0,
            substracted: 37,
            decreased: 0,
            less: 0,
            expected: 115,
         },
         {
            added: 178,
            increased: 11,
            more: 0,
            substracted: 0,
            decreased: 0,
            less: 0,
            expected: 197,
         },
         {
            added: 237,
            increased: 137,
            more: 0,
            substracted: 0,
            decreased: 45,
            less: 0,
            expected: 455,
         },
         {
            added: 391,
            increased: 56,
            more: 0,
            substracted: 78,
            decreased: 12,
            less: 0,
            expected: 485,
         },
         {
            added: 452,
            increased: 0,
            more: 17,
            substracted: 0,
            decreased: 0,
            less: 0,
            expected: 528,
         },
         {
            added: 329,
            increased: 145,
            more: 18,
            substracted: 22,
            decreased: 32,
            less: 8,
            expected: 738,
         },
         {
            added: 0,
            increased: 345,
            more: 28,
            substracted: 0,
            decreased: 82,
            less: 11,
            expected: 0,
         },
      ];

      it.each(samples)(
         '+$added & +$increased% & *$more% & -$substracted & -$decreased% & *-$less% -> $expected',
         (sample) => {
            const result = StatisticMgt.computeTotalStatistic(
               sample.added,
               sample.increased,
               sample.more,
               sample.substracted,
               sample.decreased,
               sample.less,
            );
            expect(result).toBe(sample.expected);
         },
      );
   });

   describe('computeLifeStolen', () => {
      const samples = [
         {
            damages: 0,
            realLifeSteal: 0,
            realLifeStealPercent: 0,
            defenderVitality: 0,
            defenderMagicShield: 0,
            expected: 0,
         },
         {
            damages: 4827,
            realLifeSteal: 0,
            realLifeStealPercent: 0,
            defenderVitality: 0,
            defenderMagicShield: 0,
            expected: 0,
         },
         {
            damages: 1938,
            realLifeSteal: 18,
            realLifeStealPercent: 0,
            defenderVitality: 0,
            defenderMagicShield: 0,
            expected: 0,
         },
         {
            damages: 1938,
            realLifeSteal: 18,
            realLifeStealPercent: 35,
            defenderVitality: 0,
            defenderMagicShield: 0,
            expected: 0,
         },
         {
            damages: 1938,
            realLifeSteal: 18,
            realLifeStealPercent: 0,
            defenderVitality: 30,
            defenderMagicShield: 0,
            expected: 18,
         },
         {
            damages: 1938,
            realLifeSteal: 18,
            realLifeStealPercent: 0,
            defenderVitality: 15,
            defenderMagicShield: 0,
            expected: 15,
         },
         {
            damages: 1938,
            realLifeSteal: 15,
            realLifeStealPercent: 0,
            defenderVitality: 15,
            defenderMagicShield: 0,
            expected: 15,
         },
         {
            damages: 50,
            realLifeSteal: 6,
            realLifeStealPercent: 0,
            defenderVitality: 120,
            defenderMagicShield: 30,
            expected: 6,
         },
         {
            damages: 25,
            realLifeSteal: 6,
            realLifeStealPercent: 0,
            defenderVitality: 120,
            defenderMagicShield: 30,
            expected: 0,
         },
         {
            damages: 720,
            realLifeSteal: 0,
            realLifeStealPercent: 0.2,
            defenderVitality: 0,
            defenderMagicShield: 0,
            expected: 0,
         },
         {
            damages: 720,
            realLifeSteal: 0,
            realLifeStealPercent: 0.02,
            defenderVitality: 32000,
            defenderMagicShield: 0,
            expected: 14,
         },
         {
            damages: 720,
            realLifeSteal: 2,
            realLifeStealPercent: 0.02,
            defenderVitality: 32000,
            defenderMagicShield: 0,
            expected: 16,
         },
         {
            damages: 720,
            realLifeSteal: 0,
            realLifeStealPercent: 0.02,
            defenderVitality: 32000,
            defenderMagicShield: 500,
            expected: 4,
         },
         {
            damages: 720,
            realLifeSteal: 5,
            realLifeStealPercent: 0.02,
            defenderVitality: 32000,
            defenderMagicShield: 500,
            expected: 9,
         },
      ];

      it.each(samples)(
         '$realLifeSteal LS & $realLifeStealPercent% LS of $damages damages on a $defenderVitality HP & $defenderMagicShield MS -> $expected HP',
         (sample) => {
            const result = StatisticMgt.computeLifeStolen(
               sample.damages,
               sample.realLifeSteal,
               sample.realLifeStealPercent,
               sample.defenderVitality,
               sample.defenderMagicShield,
            );
            expect(result).toEqual(sample.expected);
         },
      );
   });

   describe('computeHitChance', () => {
      const samples = [
         {
            attackerHitChance: 0,
            defenderDodgeChance: 0,
            expected: 0.05,
         },
         {
            attackerHitChance: 0,
            defenderDodgeChance: 100,
            expected: 0.05,
         },
         {
            attackerHitChance: 100,
            defenderDodgeChance: 0,
            expected: 1,
         },
         {
            attackerHitChance: 100,
            defenderDodgeChance: 100,
            expected: 1,
         },
         {
            attackerHitChance: 75,
            defenderDodgeChance: 25,
            expected: 1,
         },
         {
            attackerHitChance: 25,
            defenderDodgeChance: 75,
            expected: 0.8575393107166762,
         },
         {
            attackerHitChance: 538,
            defenderDodgeChance: 11930,
            expected: 0.41150769557087663,
         },
      ];

      it.each(samples)(
         'Attacker hit chance: $attackerHitChance% & Defender dodge chance: $defenderDodgeChance% -> $expected%',
         (sample) => {
            const result = StatisticMgt.computeHitChance(
               sample.attackerHitChance,
               sample.defenderDodgeChance,
            );
            expect(result).toEqual(sample.expected);
         },
      );
   });

   describe('computeAreaOfEffectDamages', () => {
      const samples = [
         {
            damages: 0,
            areaOfEffect: 0,
            distance: 0,
            expected: 0,
         },
         {
            damages: 0,
            areaOfEffect: 100,
            distance: 0,
            expected: 0,
         },
         {
            damages: 0,
            areaOfEffect: 0,
            distance: 1,
            expected: 0,
         },
         {
            damages: 100,
            areaOfEffect: 0,
            distance: 0,
            expected: 100,
         },
         {
            damages: 100,
            areaOfEffect: 0,
            distance: 1,
            expected: 37,
         },
         {
            damages: 100,
            areaOfEffect: 0,
            distance: 2,
            expected: 25,
         },
         {
            damages: 100,
            areaOfEffect: 0,
            distance: 3,
            expected: 12,
         },
         {
            damages: 100,
            areaOfEffect: 15,
            distance: 1,
            expected: 43,
         },
      ];

      it.each(samples)(
         '$damages damages on a $areaOfEffect% increased AoE on a $distance distance target -> $expected damages',
         (sample) => {
            const result = StatisticMgt.computeAreaOfEffectDamages(
               sample.damages,
               sample.areaOfEffect,
               sample.distance,
            );
            expect(result).toEqual(sample.expected);
         },
      );
   });

   describe('computeDamages', () => {
      const samples = [
         {
            weaponBaseMin: 0,
            weaponBaseMax: 0,
            weaponRealStatistic: 0,
            realStatistic: 0,
            defenderRealResistance: 0,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 0,
            mockRandom: () => {
               Math.random = () => 0.5;
            },
         },
         {
            weaponBaseMin: 1,
            weaponBaseMax: 5,
            weaponRealStatistic: 0,
            realStatistic: 0,
            defenderRealResistance: 0,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 3,
            mockRandom: () => {
               Math.random = () => 0.5;
            },
         },
         {
            weaponBaseMin: 3,
            weaponBaseMax: 12,
            weaponRealStatistic: 0,
            realStatistic: 0,
            defenderRealResistance: 0,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 9,
            mockRandom: () => {
               Math.random = () => 0.6778454;
            },
         },
         {
            weaponBaseMin: 3,
            weaponBaseMax: 12,
            weaponRealStatistic: 120,
            realStatistic: 0,
            defenderRealResistance: 0,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 13,
            mockRandom: () => {
               Math.random = () => 0.379449;
            },
         },
         {
            weaponBaseMin: 3,
            weaponBaseMax: 12,
            weaponRealStatistic: 120,
            realStatistic: 0,
            defenderRealResistance: 0,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 24,
            mockRandom: () => {
               Math.random = () => 0.897392;
            },
         },
         {
            weaponBaseMin: 3,
            weaponBaseMax: 12,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 0,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 184,
            mockRandom: () => {
               Math.random = () => 0.932849;
            },
         },
         {
            weaponBaseMin: 3,
            weaponBaseMax: 12,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 0,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 61,
            mockRandom: () => {
               Math.random = () => 0.127944;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 0,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 831,
            mockRandom: () => {
               Math.random = () => 0.63922;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 0,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 801,
            mockRandom: () => {
               Math.random = () => 0.63922;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 0,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 721,
            mockRandom: () => {
               Math.random = () => 0.63922;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 5,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 499,
            mockRandom: () => {
               Math.random = () => 0.04;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 5,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 499,
            mockRandom: () => {
               Math.random = () => 0.06;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 5,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 45,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 723,
            mockRandom: () => {
               Math.random = () => 0.04;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 5,
            realCriticalStrikeChancePercent: 0,
            realCriticalStrikeDamages: 45,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 499,
            mockRandom: () => {
               Math.random = () => 0.06;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 15,
            realCriticalStrikeChancePercent: 85,
            realCriticalStrikeDamages: 45,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 679,
            mockRandom: () => {
               Math.random = () => 0.50665;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 15,
            realCriticalStrikeChancePercent: 85,
            realCriticalStrikeDamages: 45,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 804,
            mockRandom: () => {
               Math.random = () => 0.20665;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 15,
            realCriticalStrikeChancePercent: 85,
            realCriticalStrikeDamages: 45,
            defenderRealCriticalResistance: 44,
            defenderRealCriticalResistancePercent: 0,
            expected: 760,
            mockRandom: () => {
               Math.random = () => 0.20665;
            },
         },
         {
            weaponBaseMin: 37,
            weaponBaseMax: 64,
            weaponRealStatistic: 120,
            realStatistic: 600,
            defenderRealResistance: 30,
            defenderRealResistancePercent: 10,
            realCriticalStrikeChance: 15,
            realCriticalStrikeChancePercent: 85,
            realCriticalStrikeDamages: 45,
            defenderRealCriticalResistance: 44,
            defenderRealCriticalResistancePercent: 10,
            expected: 684,
            mockRandom: () => {
               Math.random = () => 0.20665;
            },
         },
      ];

      it.each(samples)(
         '[$weaponBaseMin, $weaponBaseMax] @ $weaponRealStatistic WS + $realStatistic S ($realCriticalStrikeChance + $realCriticalStrikeChancePercent% + $realCriticalStrikeDamages crits) against $defenderRealCriticalResistance + $defenderRealCriticalResistancePercent% ($defenderRealCriticalResistance + $defenderRealCriticalResistancePercent%) -> $expected damages',
         (sample) => {
            sample.mockRandom();

            const result = StatisticMgt.computeDamages(
               sample.weaponBaseMin,
               sample.weaponBaseMax,
               sample.weaponRealStatistic,
               sample.realStatistic,
               sample.defenderRealResistance,
               sample.defenderRealResistancePercent,
               sample.realCriticalStrikeChance,
               sample.realCriticalStrikeChancePercent,
               sample.realCriticalStrikeDamages,
               sample.defenderRealCriticalResistance,
               sample.defenderRealCriticalResistancePercent,
            );

            expect(result).toEqual(sample.expected);
         },
      );
   });

   describe('computeCriticalDamages', () => {
      const samples = [
         {
            finalDamages: 0,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 0,
         },
         {
            finalDamages: 1053,
            realCriticalStrikeDamages: 0,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 1053,
         },
         {
            finalDamages: 1053,
            realCriticalStrikeDamages: 100,
            defenderRealCriticalResistance: 0,
            defenderRealCriticalResistancePercent: 0,
            expected: 2106,
         },
         {
            finalDamages: 1053,
            realCriticalStrikeDamages: 100,
            defenderRealCriticalResistance: 30,
            defenderRealCriticalResistancePercent: 0,
            expected: 2076,
         },
         {
            finalDamages: 1053,
            realCriticalStrikeDamages: 100,
            defenderRealCriticalResistance: 30,
            defenderRealCriticalResistancePercent: 60,
            expected: 830,
         },
      ];

      it.each(samples)(
         '$finalDamages damages with $realCriticalStrikeDamages crits damages against $defenderRealCriticalResistance + defenderRealCriticalResistancePercent% crits resistances -> $expected damages',
         (sample) => {
            const result = StatisticMgt.computeCriticalDamages(
               sample.finalDamages,
               sample.realCriticalStrikeDamages,
               sample.defenderRealCriticalResistance,
               sample.defenderRealCriticalResistancePercent,
            );
            expect(result).toEqual(sample.expected);
         },
      );
   });

   describe('computeRealStatistics', () => {
      const samples = [
         {
            title: 'Empty statistics',
            partialStatistics: StatisticMgt.makeMockedStatistics({}),
            expected: StatisticMgt.makeMockedRealStatistics({}),
         },
         {
            title: 'Base statistics',
            partialStatistics: StatisticMgt.makeMockedStatistics({
               'vitality_+f': 100,
               'magicShield_+f': 200,
               'strength_+f': 89,
               'dexterity_+f': 10,
               'intelligence_+f': 5,
               'luck_+f': 10,
            }),
            expected: StatisticMgt.makeMockedRealStatistics({
               vitality: 117,
               magicShield: 201,
               strength: 89,
               dexterity: 10,
               intelligence: 5,
               luck: 10,
               prospect: 2,
               evasion: 2,
               initiative: 152,
            }),
         },
         {
            title: 'Increased base statistics',
            partialStatistics: StatisticMgt.makeMockedStatistics({
               'vitality_+f': 100,
               'vitality_+%': 25,
               'vitality_+x%': 35,
               'magicShield_+f': 200,
               'magicShield_+%': 25,
               'strength_+f': 89,
               'strength_+%': 25,
               'dexterity_+f': 10,
               'dexterity_+%': 25,
               'intelligence_+f': 15,
               'intelligence_+%': 25,
               'luck_+f': 10,
               'luck_+x%': 35,
            }),
            expected: StatisticMgt.makeMockedRealStatistics({
               vitality: 190,
               magicShield: 253,
               strength: 111,
               dexterity: 12,
               intelligence: 18,
               luck: 13,
               prospect: 2,
               evasion: 2,
               initiative: 170,
            }),
         },
         {
            title: 'Increased base statistics with all attributes',
            partialStatistics: StatisticMgt.makeMockedStatistics({
               'vitality_+f': 100,
               'vitality_+%': 25,
               'vitality_+x%': 35,
               'magicShield_+f': 200,
               'magicShield_+%': 25,
               'strength_+f': 89,
               'strength_+%': 25,
               'dexterity_+f': 10,
               'dexterity_+%': 25,
               'intelligence_+f': 15,
               'intelligence_+%': 25,
               'luck_+f': 10,
               'luck_+x%': 35,
               'allAttributes_+f': 10,
               'allAttributes_+%': 25,
               'allAttributes_+x%': 15,
            }),
            expected: StatisticMgt.makeMockedRealStatistics({
               vitality: 202,
               magicShield: 258,
               strength: 170,
               dexterity: 34,
               intelligence: 43,
               luck: 37,
               prospect: 7,
               evasion: 6,
               initiative: 223,
            }),
         },
         {
            title: 'Should not cap the percent resistances',
            partialStatistics: StatisticMgt.makeMockedStatistics({
               'iceResistance_+f': 87,
               'iceResistance_+%': 27,
            }),
            expected: StatisticMgt.makeMockedRealStatistics({
               iceResistance: 87,
               iceResistancePercent: 27,
            }),
         },
         {
            title: 'Should cap the percent resistances',
            partialStatistics: StatisticMgt.makeMockedStatistics({
               'iceResistance_+f': 87,
               'iceResistance_+%': 67,
            }),
            expected: StatisticMgt.makeMockedRealStatistics({
               iceResistance: 87,
               iceResistancePercent: 50,
            }),
         },
         {
            title: 'Should compute the life steal',
            partialStatistics: StatisticMgt.makeMockedStatistics({
               'lifeSteal_+f': 87,
               'lifeSteal_+%': 67,
            }),
            expected: StatisticMgt.makeMockedRealStatistics({
               lifeSteal: 145,
            }),
         },
      ];

      it.each(samples)('$title', (sample) => {
         const result = StatisticMgt.computeRealStatistics(sample.partialStatistics);
         expect(result).toEqual(sample.expected);
      });
   });

   describe('mergeStatistics', () => {
      const samples = [
         {
            title: 'Empty statistics',
            statistics: [StatisticMgt.makeMockedStatistics({})],
            expected: StatisticMgt.makeMockedStatistics({}),
         },
         {
            title: 'One statistics',
            statistics: [
               StatisticMgt.makeMockedStatistics({
                  'vitality_+f': 100,
                  'magicShield_+f': 200,
                  'strength_+f': 89,
                  'dexterity_+f': 10,
                  'intelligence_+f': 5,
                  'luck_+f': 10,
               }),
            ],
            expected: StatisticMgt.makeMockedStatistics({
               'vitality_+f': 100,
               'magicShield_+f': 200,
               'strength_+f': 89,
               'dexterity_+f': 10,
               'intelligence_+f': 5,
               'luck_+f': 10,
            }),
         },
         {
            title: 'Two statistics: no multipliers',
            statistics: [
               StatisticMgt.makeMockedStatistics({
                  'vitality_+f': 100,
                  'magicShield_+f': 200,
                  'strength_+f': 89,
                  'dexterity_+f': 10,
                  'intelligence_+f': 5,
                  'luck_+f': 10,
               }),
               StatisticMgt.makeMockedStatistics({
                  'vitality_+f': 37,
                  'magicShield_+f': 0,
                  'strength_+f': 20,
                  'dexterity_+f': 5,
                  'intelligence_+f': 0,
                  'luck_+f': 35,
               }),
            ],
            expected: StatisticMgt.makeMockedStatistics({
               'vitality_+f': 137,
               'magicShield_+f': 200,
               'strength_+f': 109,
               'dexterity_+f': 15,
               'intelligence_+f': 5,
               'luck_+f': 45,
            }),
         },
         {
            title: 'Two statistics: with multipliers',
            statistics: [
               StatisticMgt.makeMockedStatistics({
                  'vitality_+f': 100,
                  'magicShield_+f': 200,
                  'strength_+f': 89,
                  'dexterity_+f': 10,
                  'intelligence_+f': 5,
                  'luck_+f': 10,
                  'iceDamages_+x%': 8,
               }),
               StatisticMgt.makeMockedStatistics({
                  'vitality_+f': 37,
                  'magicShield_+f': 0,
                  'strength_+f': 20,
                  'dexterity_+f': 5,
                  'intelligence_+f': 0,
                  'luck_+f': 35,
                  'iceDamages_+x%': 15,
               }),
            ],
            expected: StatisticMgt.makeMockedStatistics({
               'vitality_+f': 137,
               'magicShield_+f': 200,
               'strength_+f': 109,
               'dexterity_+f': 15,
               'intelligence_+f': 5,
               'luck_+f': 45,
               'iceDamages_+x%': 24,
            }),
         },
         {
            title: 'Multiple statistics: with multipliers',
            statistics: [
               StatisticMgt.makeMockedStatistics({
                  'iceDamages_+x%': 8,
               }),
               StatisticMgt.makeMockedStatistics({
                  'iceDamages_+x%': 15,
               }),
               StatisticMgt.makeMockedStatistics({
                  'iceDamages_+x%': 15,
               }),
               StatisticMgt.makeMockedStatistics({
                  'iceDamages_+x%': 15,
               }),
            ],
            expected: StatisticMgt.makeMockedStatistics({
               'iceDamages_+x%': 63,
            }),
         },
      ];

      it.each(samples)('$title', (sample) => {
         const result = StatisticMgt.mergeStatistics(...sample.statistics);
         expect(result).toEqual(sample.expected);
      });
   });
});
