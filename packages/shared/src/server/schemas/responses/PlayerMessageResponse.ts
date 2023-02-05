import { z } from 'zod';

export const zPlayerMessageResponse = z.object({
   type: z.literal('playerMessageResponse'),
   data: z.null(),
});

export type PlayerMessageResponse = z.infer<typeof zPlayerMessageResponse>;
