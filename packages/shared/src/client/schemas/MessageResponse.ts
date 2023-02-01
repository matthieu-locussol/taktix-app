import { z } from 'zod';

export const zMessageResponse = z.object({
   type: z.literal('messageResponse'),
   data: z.null(),
});

export type MessageResponse = z.infer<typeof zMessageResponse>;
