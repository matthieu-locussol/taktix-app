import { z } from 'zod';

export const zPlayerMoveMessage = z.object({
   type: z.literal('playerMove'),
   data: z.object({
      name: z.string(),
      x: z.number(),
      y: z.number(),
   }),
});

export type PlayerMoveMessage = z.infer<typeof zPlayerMoveMessage>;
