import { z } from 'zod';

export const zHelloSchema = z.object({
   type: z.literal('hello'),
   data: z.object({
      name: z.string(),
   }),
});

export type HelloSchema = z.infer<typeof zHelloSchema>;
