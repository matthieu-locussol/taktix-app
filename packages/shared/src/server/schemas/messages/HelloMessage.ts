import { z } from 'zod';

export const zHelloMessage = z.object({
   type: z.literal('hello'),
   data: z.object({
      name: z.string(),
   }),
});

export type HelloMessage = z.infer<typeof zHelloMessage>;
