import { z } from 'zod';

export const zHelloResponseSchema = z.object({
   type: z.literal('helloResponse'),
   data: z.object({
      response: z.string(),
   }),
});

export type HelloSchemaResponse = z.infer<typeof zHelloResponseSchema>;
