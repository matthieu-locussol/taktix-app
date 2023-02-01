import { z } from 'zod';

export const zHelloResponse = z.object({
   type: z.literal('helloResponse'),
   data: z.object({
      response: z.string(),
   }),
});

export type HelloResponse = z.infer<typeof zHelloResponse>;
