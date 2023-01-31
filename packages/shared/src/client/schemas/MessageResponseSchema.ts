import { z } from 'zod';

export const zMessageResponseSchema = z.object({
   type: z.literal('messageResponse'),
   data: z.null(),
});

export type MessageResponseSchema = z.infer<typeof zMessageResponseSchema>;
