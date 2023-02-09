import { z } from 'zod';

export const zPlayerMoveResponse = z.object({
   type: z.literal('playerMoveResponse'),
   data: z.null(),
});

export type PlayerMoveResponse = z.infer<typeof zPlayerMoveResponse>;
