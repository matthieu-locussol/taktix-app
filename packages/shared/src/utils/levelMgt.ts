import { EXPERIENCE_TABLE } from '../data/levels';

export namespace LevelMgt {
   export const MIN_LEVEL = EXPERIENCE_TABLE[0].level;

   export const MAX_LEVEL = EXPERIENCE_TABLE[EXPERIENCE_TABLE.length - 1].level;

   export const getLevel = (experience: number): number => {
      let left = 0;
      let right = EXPERIENCE_TABLE.length - 1;

      while (left < right) {
         const mid = Math.floor((left + right) / 2);
         if (EXPERIENCE_TABLE[mid].experience <= experience) {
            left = mid + 1;
         } else {
            right = mid;
         }
      }

      if (EXPERIENCE_TABLE[left].experience > experience && left > 0) {
         left -= 1;
      }

      return EXPERIENCE_TABLE[left].level;
   };

   const computeExperienceBonus = (playersCount: number, playersWon: boolean): number => {
      if (!playersWon) {
         return 0.5;
      }

      return (
         {
            1: 1,
            2: 1.1,
            3: 1.5,
         }[playersCount] || 0
      );
   };

   export const computeExperienceGain = (
      level: number,
      monsters: { level: number; experience: number }[],
      players: { experience: number }[],
      playersWon: boolean,
   ): number => {
      const monstersExperienceSum = monsters.reduce((acc, monster) => acc + monster.experience, 0);
      const experienceBonus = computeExperienceBonus(players.length, playersWon);
      const playersLevelsSum = players.reduce(
         (acc, player) => acc + getLevel(player.experience),
         0,
      );
      const monstersLevelsSum = monsters.reduce((acc, monster) => acc + monster.level, 0);

      const winnersLevelsSum = playersWon ? playersLevelsSum : monstersLevelsSum;
      const losersLevelsSum = playersWon ? monstersLevelsSum : playersLevelsSum;

      return Math.floor(
         monstersExperienceSum *
            Math.max(1 + losersLevelsSum / winnersLevelsSum, 1.3) *
            experienceBonus *
            (1 + level / winnersLevelsSum),
      );
   };

   export const computeGainedLevels = (oldExperience: number, newExperience: number): number => {
      const oldLevel = getLevel(oldExperience);
      const newLevel = getLevel(newExperience);
      return newLevel - oldLevel;
   };
}
