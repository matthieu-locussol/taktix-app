import { describe, expect, it } from 'vitest';

import { statistics } from '../types/Statistic';

import { affixes } from './affixes';

describe('affixes', () => {
   describe('should have correctly set prefixes', () => {
      Object.entries(affixes).forEach(([type, { prefixes }]) => {
         statistics.forEach((statistic) => {
            if (prefixes[statistic] !== undefined) {
               const existingAffixes = prefixes[statistic] ?? [];

               for (const { name } of existingAffixes) {
                  it(`${type} > ${statistic} > ${name}`, () => {
                     expect(name.startsWith('of ')).toBeFalsy();
                  });
               }
            }
         });
      });
   });

   describe('should have correctly set suffixes', () => {
      Object.entries(affixes).forEach(([type, { suffixes }]) => {
         statistics.forEach((statistic) => {
            if (suffixes[statistic] !== undefined) {
               const existingAffixes = suffixes[statistic] ?? [];

               for (const { name } of existingAffixes) {
                  it(`${type} > ${statistic} > ${name}`, () => {
                     expect(name.startsWith('of ')).toBeTruthy();
                  });
               }
            }
         });
      });
   });
});
