import { z } from 'zod';

export const zPingSchema = z.object({
   type: z.literal('ping'),
   data: z.object({
      message: z.string(),
   }),
});

export type PingSchema = z.infer<typeof zPingSchema>;
