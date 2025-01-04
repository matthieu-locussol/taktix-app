import { describe, expect, it } from 'vitest';

import { LevelMgt } from './levelMgt.ts';

describe('LevelMgt', () => {
   describe('getLevel', () => {
      const samples = [
         {
            experience: 0,
            level: LevelMgt.MIN_LEVEL,
         },
         {
            experience: Number.MAX_SAFE_INTEGER,
            level: LevelMgt.MAX_LEVEL,
         },
         {
            experience: 1,
            level: LevelMgt.MIN_LEVEL,
         },
         {
            experience: 114,
            level: 1,
         },
         {
            experience: 115,
            level: 2,
         },
         {
            experience: 116,
            level: 2,
         },
         {
            experience: 30_000,
            level: 11,
         },
      ];

      it.each(samples)('should return %i for %i experience', ({ experience, level }) => {
         expect(LevelMgt.getLevel(experience)).toBe(level);
      });
   });

   describe('computeExperienceGain', () => {
      const samples = [
         {
            title: 'Level 1 won against 1 monster - Level 1 XP',
            level: 1,
            monsters: [{ level: 1, experience: 100 }],
            players: [{ experience: 37 }],
            playersWon: true,
            expected: 400,
         },
         {
            title: 'Level 1 & 14 won against 1 monster - Level 1 XP',
            level: 1,
            monsters: [{ level: 1, experience: 100 }],
            players: [{ experience: 37 }, { experience: 55_000 }],
            playersWon: true,
            expected: 152,
         },
         {
            title: 'Level 1 & 14 won against 1 monster - Level 14 XP',
            level: 14,
            monsters: [{ level: 1, experience: 100 }],
            players: [{ experience: 37 }, { experience: 55_000 }],
            playersWon: true,
            expected: 276,
         },
         {
            title: 'Level 4 & 14 won against 1 monster - Level 4 XP',
            level: 4,
            monsters: [
               { level: 3, experience: 350 },
               { level: 7, experience: 600 },
               { level: 8, experience: 650 },
            ],
            players: [{ experience: 1_800 }, { experience: 55_000 }],
            playersWon: true,
            expected: 4302,
         },
         {
            title: 'Level 4 & 14 won against 1 monster - Level 14 XP',
            level: 14,
            monsters: [
               { level: 3, experience: 350 },
               { level: 7, experience: 600 },
               { level: 8, experience: 650 },
            ],
            players: [{ experience: 1_800 }, { experience: 55_000 }],
            playersWon: true,
            expected: 6257,
         },
      ];

      it.each(samples)('$title', ({ level, monsters, players, playersWon, expected }) => {
         expect(LevelMgt.computeExperienceGain(level, monsters, players, playersWon)).toBe(
            expected,
         );
      });
   });

   describe('computeGainedLevels', () => {
      const samples = [
         {
            oldExperience: 0,
            newExperience: 0,
            expected: 0,
         },
         {
            oldExperience: 0,
            newExperience: 1,
            expected: 0,
         },
         {
            oldExperience: 1,
            newExperience: 1,
            expected: 0,
         },
         {
            oldExperience: 1,
            newExperience: 114,
            expected: 0,
         },
         {
            oldExperience: 37,
            newExperience: 115,
            expected: 1,
         },
         {
            oldExperience: 114,
            newExperience: 116,
            expected: 1,
         },
      ];

      it.each(samples)(
         '$oldExperience xp -> $newExperience xp = level $expected',
         ({ oldExperience, newExperience, expected }) => {
            expect(LevelMgt.computeGainedLevels(oldExperience, newExperience)).toBe(expected);
         },
      );
   });
});
