import { z } from 'zod';

export const zPlayerLoggedOutResponse = z.object({
   type: z.literal('playerLoggedOutResponse'),
   data: z.null(),
});

export type PlayerLoggedOutResponse = z.infer<typeof zPlayerLoggedOutResponse>;
