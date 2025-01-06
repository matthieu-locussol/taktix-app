import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { ZodMgt } from './zodMgt';

describe('ZodMgt', () => {
   describe('isValidZodLiteralUnion', () => {
      it('should return true if the literals array has at least 1 element', () => {
         const literals = [z.literal('a')];

         expect(ZodMgt.isValidZodLiteralUnion(literals)).toBe(true);
      });

      it('should return false if the literals array has less than 1 element', () => {
         const literals: z.ZodLiteral<''>[] = [];

         expect(ZodMgt.isValidZodLiteralUnion(literals)).toBe(false);
      });
   });

   describe('constructZodLiteralUnionType', () => {
      it('should return a ZodUnion schema of the literals passed', () => {
         const literals = [z.literal('a'), z.literal('b')];
         const union = ZodMgt.constructZodLiteralUnionType(literals);

         expect(JSON.stringify(union)).toEqual(
            JSON.stringify(z.union([z.literal('a'), z.literal('b')])),
         );
      });

      it('should throw an error if the literals array has less than 1 element', () => {
         const literals: z.ZodLiteral<''>[] = [];

         expect(() => ZodMgt.constructZodLiteralUnionType(literals)).toThrow();
      });
   });
});
