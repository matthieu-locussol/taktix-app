import { z } from 'zod';

export const zSumSchema = z.object({
   type: z.literal('sum'),
   data: z.object({
      operand1: z.number(),
      operand2: z.number(),
   }),
});

export type SumSchema = z.infer<typeof zSumSchema>;
