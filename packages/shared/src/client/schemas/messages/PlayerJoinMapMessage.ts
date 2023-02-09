import { z } from 'zod';

export const zPlayerJoinMapMessage = z.object({
   type: z.literal('playerJoinMap'),
   data: z.object({
      name: z.string(),
      map: z.string(),
      x: z.number(),
      y: z.number(),
   }),
});

export type PlayerJoinMapMessage = z.infer<typeof zPlayerJoinMapMessage>;
