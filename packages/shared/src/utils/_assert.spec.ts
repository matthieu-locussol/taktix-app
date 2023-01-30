import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
   _assert,
   _assertDeepStrictEqual,
   _assertEq,
   _assertStrictEqual,
   _assertTrue,
   _throw,
} from './_assert';

describe('_assert', () => {
   beforeEach(() => {
      const ConsoleMock = vi.fn(() => ({
         error: () => ({}),
      }));

      vi.stubGlobal('console', ConsoleMock);
   });

   it('_assert', () => {
      expect(() => _assert(true)).to.throw();
      expect(() => _assert(false)).to.throw();
      expect(() => _assert(null)).to.throw();
      expect(() => _assert(undefined)).to.throw();

      const variable: string | null = 'value';
      expect(() => _assert(variable)).not.to.throw();
   });

   it('_assertTrue', () => {
      expect(() => _assertTrue(true)).not.to.throw();
      expect(() => _assertTrue(false)).to.throw();
   });

   it('_assertEq', () => {
      expect(() => _assertEq('', '')).not.to.throw();
      expect(() => _assertEq('value', 'value2')).to.throw();
   });

   it('_assertDeepStrictEqual', () => {
      expect(() => _assertDeepStrictEqual({}, {})).not.to.throw();
      expect(() => _assertDeepStrictEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).not.to.throw();
      expect(() =>
         _assertDeepStrictEqual({ a: 1, b: { x: 1, y: 2 } }, { b: { y: 2, x: 1 }, a: 1 }),
      ).not.to.throw();
      expect(() => _assertDeepStrictEqual({ a: 1, b: 2 }, { b: 2, a: '1' })).to.throw();
   });

   it('_assertStrictEqual', () => {
      expect(() => _assertStrictEqual('', '')).not.to.throw();
      expect(() => _assertStrictEqual('', 'value')).to.throw();
      expect(() => _assertStrictEqual(123, '123')).to.throw();
   });

   it('_throw', () => {
      expect(() => _throw('')).to.throw('');
      expect(() => _throw('ErrorMsg')).to.throw('ErrorMsg');
      expect(() => _throw(new Error('Msg'))).to.throw('Msg');
   });
});
