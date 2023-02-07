import { z } from 'zod';

export const zMoveMessage = z.object({
   type: z.literal('move'),
   data: z.object({
      posX: z.number(),
      posY: z.number(),
   }),
});

export type MoveMessage = z.infer<typeof zMoveMessage>;
