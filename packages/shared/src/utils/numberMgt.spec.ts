import { describe, expect, it } from 'vitest';
import { NumberMgt } from './numberMgt';

describe('NumberMgt', () => {
   describe('clamp', () => {
      const samples = [
         {
            title: 'should return min if value is less than min',
            value: -5,
            min: 1,
            max: 10,
            expected: 1,
         },
         {
            title: 'should return max if value is greater than max',
            value: 15,
            min: 1,
            max: 10,
            expected: 10,
         },
         {
            title: 'should return value if it is within the range',
            value: 5,
            min: 1,
            max: 10,
            expected: 5,
         },
         {
            title: 'should handle the case where min equals max',
            value: 5,
            min: 3,
            max: 3,
            expected: 3,
         },
         {
            title: 'should return min when value equals min',
            value: 1,
            min: 1,
            max: 10,
            expected: 1,
         },
         {
            title: 'should return max when value equals max',
            value: 10,
            min: 1,
            max: 10,
            expected: 10,
         },
         {
            title: 'should handle negative min and max values',
            value: -5,
            min: -10,
            max: -1,
            expected: -5,
         },
         {
            title: 'should clamp value to max when it is below negative min',
            value: -15,
            min: -10,
            max: -1,
            expected: -10,
         },
         {
            title: 'should clamp value to min when it is above negative max',
            value: 0,
            min: -10,
            max: -1,
            expected: -1,
         },
         {
            title: 'should handle zero as min, max, or value',
            value: 0,
            min: 0,
            max: 10,
            expected: 0,
         },
         {
            title: 'should handle large numbers',
            value: 1000000,
            min: -1000000,
            max: 500000,
            expected: 500000,
         },
         {
            title: 'should work with floating point numbers',
            value: 5.5,
            min: 1.2,
            max: 10.6,
            expected: 5.5,
         },
         {
            title: 'should clamp value correctly with floating point boundaries',
            value: 0.7,
            min: 1.2,
            max: 10.6,
            expected: 1.2,
         },
      ];

      samples.forEach(({ title, value, min, max, expected }) => {
         it(title, () => {
            expect(NumberMgt.clamp(value, min, max)).toBe(expected);
         });
      });
   });

   describe('random', () => {
      const samples = [
         {
            title: 'should return a number between min and max',
            min: 1,
            max: 10,
         },
         {
            title: 'should return a number between 0 and 1',
            min: 0,
            max: 1,
         },
         {
            title: 'should return a number between -10 and 10',
            min: -10,
            max: 10,
         },
         {
            title: 'should return a number between 0 and 100',
            min: 0,
            max: 100,
         },
         {
            title: 'should return a number between 0 and 10000',
            min: 0,
            max: 10000,
         },
         {
            title: 'should return a number between -10000 and 10000',
            min: -10000,
            max: 10000,
         },
         {
            title: 'should return a number between -1000000 and 1000000',
            min: -1000000,
            max: 1000000,
         },
      ];

      samples.forEach(({ title, min, max }) => {
         it(title, () => {
            const value = NumberMgt.random(min, max);
            expect(value).toBeGreaterThanOrEqual(min);
            expect(value).toBeLessThanOrEqual(max);
         });
      });
   });
});
