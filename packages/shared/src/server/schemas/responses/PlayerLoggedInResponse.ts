import { z } from 'zod';

export const zPlayerLoggedInResponse = z.object({
   type: z.literal('playerLoggedInResponse'),
   data: z.null(),
});

export type PlayerLoggedInResponse = z.infer<typeof zPlayerLoggedInResponse>;
