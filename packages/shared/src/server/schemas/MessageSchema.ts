import { z } from 'zod';

export const zMessageSchema = z.object({
   type: z.literal('message'),
   data: z.object({
      content: z.string(),
   }),
});

export type MessageSchema = z.infer<typeof zMessageSchema>;
