import { describe, expect, it } from 'vitest';

import { ArrayMgt } from './arrayMgt';

describe('ArrayMgt', () => {
   describe('areEquals', () => {
      const samples: {
         arr1: (number | string)[];
         arr2: (number | string)[];
         expected: boolean;
      }[] = [
         {
            arr1: [1, 2, 3],
            arr2: [1, 2, 3],
            expected: true,
         },
         {
            arr1: [1, 2, 3],
            arr2: [1, 2, 3, 4],
            expected: false,
         },
         {
            arr1: [1, 2, 3],
            arr2: [3, 2, 1],
            expected: true,
         },
         {
            arr1: ['a', 'b', 'c'],
            arr2: ['c', 'b', 'a'],
            expected: true,
         },
      ] as const;

      it.each(samples)('should return %p when comparing %p and %p', ({ arr1, arr2, expected }) => {
         expect(ArrayMgt.areEquals(arr1, arr2)).toBe(expected);
      });

      expect(ArrayMgt.areEquals([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(ArrayMgt.areEquals([1, 2, 3], [1, 2, 3, 4])).toBe(false);
      expect(ArrayMgt.areEquals([1, 2, 3], [3, 2, 1])).toBe(true);
      expect(ArrayMgt.areEquals(['a', 'b', 'c'], ['c', 'b', 'a'])).toBe(true);
   });

   describe('staggeredMerge', () => {
      const samples = [
         {
            arr1: [],
            arr2: [],
            expected: [],
         },
         {
            arr1: [1],
            arr2: [],
            expected: [1],
         },
         {
            arr1: [],
            arr2: [1],
            expected: [1],
         },
         {
            arr1: [1, 2, 3],
            arr2: [4, 5],
            expected: [1, 4, 2, 5, 3],
         },
         {
            arr1: [1, 2, 3],
            arr2: [4, 5, 6],
            expected: [1, 4, 2, 5, 3, 6],
         },
         {
            arr1: [1, 2, 3, 4],
            arr2: [5, 6],
            expected: [1, 5, 2, 6, 3, 4],
         },
         {
            arr1: [1, 2],
            arr2: [3, 4, 5],
            expected: [1, 3, 2, 4, 5],
         },
      ];

      it.each(samples)(
         'should return $expected when merging $arr1 and $arr2',
         ({ arr1, arr2, expected }) => {
            expect(ArrayMgt.staggeredMerge(arr1, arr2)).toEqual(expected);
         },
      );
   });

   describe('filterNullish', () => {
      const samples = [
         {
            arr: [1, null, 2, undefined, 3],
            expected: [1, 2, 3],
         },
         {
            arr: [1, 2, 3],
            expected: [1, 2, 3],
         },
         {
            arr: [null, undefined, null, undefined],
            expected: [],
         },
      ];

      it.each(samples)('should return $expected when filtering $arr', ({ arr, expected }) => {
         expect(ArrayMgt.filterNullish(arr)).toEqual(expected);
      });
   });

   describe('makeUnique', () => {
      const samples: {
         arr: (number | string)[];
         expected: (number | string)[];
      }[] = [
         {
            arr: [1, 2, 3],
            expected: [1, 2, 3],
         },
         {
            arr: [1, 2, 3, 1, 2, 3],
            expected: [1, 2, 3],
         },
         {
            arr: ['a', 'b', 'c', 'a', 'b', 'c'],
            expected: ['a', 'b', 'c'],
         },
      ];

      it.each(samples)('should return $expected when making $arr unique', ({ arr, expected }) => {
         expect(ArrayMgt.makeUnique(arr)).toEqual(expected);
      });
   });
});
