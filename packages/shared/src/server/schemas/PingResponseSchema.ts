import { z } from 'zod';

export const zPingResponseSchema = z.object({
   type: z.literal('pingResponse'),
   data: z.object({
      message: z.string(),
   }),
});

export type PingResponse = z.infer<typeof zPingResponseSchema>;
