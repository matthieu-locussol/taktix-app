import type { MonsterType } from '../types/Monster';

export namespace MonsterMgt {
   const MONSTER_LIFE_COEFFICIENT = 1.625;
   const MONSTER_LIFE_SIGNIFICANT_NUMBERS = 2;
   const MONSTER_EXPERIENCE_COEFFICIENT = 0.1;

   const MONSTER_TYPE_COEFFICIENTS: Record<MonsterType, number> = {
      common: 1,
      magic: 1.2,
      rare: 1.4,
      boss: 1.6,
   };

   export const MONSTER_TYPE_STATS_COEFFICIENTS: Record<MonsterType, number> = {
      common: 1.2,
      magic: 1.4,
      rare: 1.7,
      boss: 2,
   };

   const roundToNearest = (n: number, decimalCount: number = 0): number => {
      const offset = 10 ** decimalCount;
      let res = n * offset;

      if (res % 1 >= 0.5) {
         res = Math.ceil(res);
      } else {
         res = Math.floor(res);
      }

      return res / offset;
   };

   const roundToSignificantFigures = (num: number, n: number): number => {
      if (num === 0) {
         return 0;
      }
      const d = Math.ceil(Math.log10(Math.abs(num)));

      if (d <= n) {
         return num;
      }
      const power = d - n;
      const magnitude = Math.floor(10 ** power);

      return roundToNearest(num / magnitude) * magnitude;
   };

   export const scaleMonsterLife = (monsterLevel: number, ratio: number): number => {
      const value = Math.floor(ratio * monsterLevel ** MONSTER_LIFE_COEFFICIENT);

      return Math.max(1, roundToSignificantFigures(value, MONSTER_LIFE_SIGNIFICANT_NUMBERS));
   };

   export const scaleMonsterStatistic = (monsterLevel: number, ratio: number): number => {
      return Math.floor(7 + monsterLevel ** 1.26 * ratio);
   };

   const computeMonsterExperience = (level: number, monsterType: MonsterType): number => {
      if (level < 200) {
         if (monsterType === 'boss') {
            return Math.floor((level * 100 + level ** 1.75 * 2) * level * 0.1 * 1.2 * 0.5);
         }

         return level * 100 + level ** 2 * 2;
      }

      if (monsterType === 'boss') {
         return Math.floor(500_000 * (1 + (level - 200) / 100));
      }

      return Math.floor(100_000 * (1 + (level - 200) / 100));
   };

   export const scaleMonsterExperience = (level: number, monsterType: MonsterType): number => {
      const coefficient = MONSTER_EXPERIENCE_COEFFICIENT * MONSTER_TYPE_COEFFICIENTS[monsterType];
      const experience = computeMonsterExperience(level, monsterType);

      return Math.floor(experience * coefficient);
   };
}
