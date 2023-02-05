import { z } from 'zod';

export const zPlayerMessageMessage = z.object({
   type: z.literal('playerMessage'),
   data: z.object({
      name: z.string(),
      content: z.string(),
   }),
});

export type PlayerMessageMessage = z.infer<typeof zPlayerMessageMessage>;
