import { z } from 'zod';

export const zMoveResponse = z.object({
   type: z.literal('moveResponse'),
   data: z.null(),
});

export type MoveResponse = z.infer<typeof zMoveResponse>;
