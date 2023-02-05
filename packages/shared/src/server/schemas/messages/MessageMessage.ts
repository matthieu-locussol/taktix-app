import { z } from 'zod';

export const zMessageMessage = z.object({
   type: z.literal('message'),
   data: z.object({
      name: z.string(),
      content: z.string(),
   }),
});

export type MessageMessage = z.infer<typeof zMessageMessage>;
