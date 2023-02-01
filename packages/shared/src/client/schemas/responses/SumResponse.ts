import { z } from 'zod';

export const zSumResponse = z.object({
   type: z.literal('sumResponse'),
   data: z.object({
      result: z.number(),
   }),
});

export type SumResponse = z.infer<typeof zSumResponse>;
