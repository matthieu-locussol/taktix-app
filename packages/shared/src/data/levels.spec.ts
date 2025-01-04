import { describe, expect, it } from 'vitest';

import { EXPERIENCE_TABLE } from './levels.ts';

describe('levels', () => {
   it('levels should start at 1 in ascending order', () => {
      for (let i = 0; i < EXPERIENCE_TABLE.length; i += 1) {
         expect(EXPERIENCE_TABLE[i].level).toBe(i + 1);
      }
   });

   it('experience should be in ascending order', () => {
      for (let i = 0; i < EXPERIENCE_TABLE.length - 1; i += 1) {
         expect(EXPERIENCE_TABLE[i].experience).toBeLessThan(EXPERIENCE_TABLE[i + 1].experience);
      }
   });
});
