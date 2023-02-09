import { z } from 'zod';

export const zPlayerJoinMapResponse = z.object({
   type: z.literal('playerJoinMapResponse'),
   data: z.null(),
});

export type PlayerJoinMapResponse = z.infer<typeof zPlayerJoinMapResponse>;
