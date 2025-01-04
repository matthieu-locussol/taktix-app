import type { MonsterType } from '../types/Monster.ts';

import { describe, expect, it } from 'vitest';

import { MonsterMgt } from './monsterMgt.ts';

describe('MonsterMgt', () => {
   describe('scaleMonsterLife', () => {
      const samples = [
         {
            monsterLevel: 1,
            ratio: 1,
            expected: 1,
         },
         {
            monsterLevel: 2,
            ratio: 1,
            expected: 3,
         },
         {
            monsterLevel: 5,
            ratio: 1,
            expected: 13,
         },
         {
            monsterLevel: 1,
            ratio: 2,
            expected: 2,
         },
         {
            monsterLevel: 2,
            ratio: 2,
            expected: 6,
         },
         {
            monsterLevel: 5,
            ratio: 2,
            expected: 27,
         },
         {
            monsterLevel: 1,
            ratio: 4,
            expected: 4,
         },
         {
            monsterLevel: 2,
            ratio: 4,
            expected: 12,
         },
         {
            monsterLevel: 5,
            ratio: 4,
            expected: 54,
         },
         {
            monsterLevel: 27,
            ratio: 1.8,
            expected: 380,
         },
         {
            monsterLevel: 125,
            ratio: 1.75,
            expected: 4500,
         },
         {
            monsterLevel: 199,
            ratio: 1.6,
            expected: 8700,
         },
         {
            monsterLevel: 200,
            ratio: 2,
            expected: 11000,
         },
      ];

      samples.forEach(({ monsterLevel, ratio, expected }) => {
         it(`level '${monsterLevel}' with ratio '${ratio}' => '${expected}'`, () => {
            expect(MonsterMgt.scaleMonsterLife(monsterLevel, ratio)).toBe(expected);
         });
      });
   });

   describe('scaleMonsterStatistic', () => {
      const samples = [
         {
            monsterLevel: 1,
            ratio: 1,
            expected: 8,
         },
         {
            monsterLevel: 2,
            ratio: 1,
            expected: 9,
         },
         {
            monsterLevel: 5,
            ratio: 1,
            expected: 14,
         },
         {
            monsterLevel: 1,
            ratio: 2,
            expected: 9,
         },
         {
            monsterLevel: 2,
            ratio: 2,
            expected: 11,
         },
         {
            monsterLevel: 5,
            ratio: 2,
            expected: 22,
         },
         {
            monsterLevel: 1,
            ratio: 4,
            expected: 11,
         },
         {
            monsterLevel: 2,
            ratio: 4,
            expected: 16,
         },
         {
            monsterLevel: 5,
            ratio: 4,
            expected: 37,
         },
         {
            monsterLevel: 27,
            ratio: 1.6,
            expected: 108,
         },
         {
            monsterLevel: 50,
            ratio: 1.6,
            expected: 228,
         },
         {
            monsterLevel: 125,
            ratio: 1.75,
            expected: 774,
         },
         {
            monsterLevel: 199,
            ratio: 1.6,
            expected: 1267,
         },
         {
            monsterLevel: 200,
            ratio: 2,
            expected: 1593,
         },
      ];

      samples.forEach(({ monsterLevel, ratio, expected }) => {
         it(`level '${monsterLevel}' with ratio '${ratio}' => '${expected}'`, () => {
            expect(MonsterMgt.scaleMonsterStatistic(monsterLevel, ratio)).toBe(expected);
         });
      });
   });

   describe('scaleMonsterExperience', () => {
      const samples: {
         monsterLevel: number;
         monsterType: MonsterType;
         expected: number;
      }[] = [
         {
            monsterLevel: 1,
            monsterType: 'common',
            expected: 10,
         },
         {
            monsterLevel: 2,
            monsterType: 'common',
            expected: 20,
         },
         {
            monsterLevel: 5,
            monsterType: 'common',
            expected: 55,
         },
         {
            monsterLevel: 1,
            monsterType: 'magic',
            expected: 12,
         },
         {
            monsterLevel: 2,
            monsterType: 'rare',
            expected: 29,
         },
         {
            monsterLevel: 5,
            monsterType: 'magic',
            expected: 66,
         },
         {
            monsterLevel: 5,
            monsterType: 'rare',
            expected: 76,
         },
         {
            monsterLevel: 5,
            monsterType: 'boss',
            expected: 25,
         },
         {
            monsterLevel: 25,
            monsterType: 'rare',
            expected: 525,
         },
         {
            monsterLevel: 25,
            monsterType: 'boss',
            expected: 734,
         },
         {
            monsterLevel: 50,
            monsterType: 'rare',
            expected: 1399,
         },
         {
            monsterLevel: 50,
            monsterType: 'boss',
            expected: 3302,
         },
         {
            monsterLevel: 100,
            monsterType: 'rare',
            expected: 4200,
         },
         {
            monsterLevel: 100,
            monsterType: 'boss',
            expected: 15671,
         },
         {
            monsterLevel: 199,
            monsterType: 'rare',
            expected: 13874,
         },
         {
            monsterLevel: 199,
            monsterType: 'boss',
            expected: 78302,
         },
         {
            monsterLevel: 200,
            monsterType: 'rare',
            expected: 13999,
         },
         {
            monsterLevel: 200,
            monsterType: 'boss',
            expected: 80000,
         },
      ];

      samples.forEach(({ monsterLevel, monsterType, expected }) => {
         it(`level '${monsterLevel}' with ratio '${monsterType}' => '${expected}'`, () => {
            expect(MonsterMgt.scaleMonsterExperience(monsterLevel, monsterType)).toBe(expected);
         });
      });
   });
});
