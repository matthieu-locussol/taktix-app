import { z } from 'zod';

export const zSumMessage = z.object({
   type: z.literal('sum'),
   data: z.object({
      operand1: z.number(),
      operand2: z.number(),
   }),
});

export type SumMessage = z.infer<typeof zSumMessage>;
