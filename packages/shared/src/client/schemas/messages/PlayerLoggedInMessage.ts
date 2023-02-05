import { z } from 'zod';

export const zPlayerLoggedInMessage = z.object({
   type: z.literal('playerLoggedIn'),
   data: z.object({
      name: z.string(),
   }),
});

export type PlayerLoggedInMessage = z.infer<typeof zPlayerLoggedInMessage>;
