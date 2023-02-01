import { z } from 'zod';

export const zPingMessage = z.object({
   type: z.literal('ping'),
   data: z.object({
      message: z.string(),
   }),
});

export type PingMessage = z.infer<typeof zPingMessage>;
