import { z } from 'zod';

export const zSumResponseSchema = z.object({
   type: z.literal('sumResponse'),
   data: z.object({
      result: z.number(),
   }),
});

export type SumResponseSchema = z.infer<typeof zSumResponseSchema>;
