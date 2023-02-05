import { z } from 'zod';

export const zLoginMessage = z.object({
   type: z.literal('login'),
   data: z.object({
      name: z.string(),
   }),
});

export type LoginMessage = z.infer<typeof zLoginMessage>;
