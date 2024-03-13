import { describe, expect, it } from 'vitest';
import { ArrayMgt } from './arrayMgt';

describe('ArrayMgt', () => {
   it('areEquals', () => {
      expect(ArrayMgt.areEquals([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(ArrayMgt.areEquals([1, 2, 3], [1, 2, 3, 4])).toBe(false);
      expect(ArrayMgt.areEquals([1, 2, 3], [3, 2, 1])).toBe(true);
      expect(ArrayMgt.areEquals(['a', 'b', 'c'], ['c', 'b', 'a'])).toBe(true);
   });
});
