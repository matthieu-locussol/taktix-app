import { z } from 'zod';

export const zPlayerLoggedOutMessage = z.object({
   type: z.literal('playerLoggedOut'),
   data: z.object({
      name: z.string(),
   }),
});

export type PlayerLoggedOutMessage = z.infer<typeof zPlayerLoggedOutMessage>;
