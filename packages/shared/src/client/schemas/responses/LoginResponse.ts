import { z } from 'zod';

export const zLoginResponse = z.object({
   type: z.literal('loginResponse'),
   data: z.object({
      response: z.union([z.literal('connected'), z.literal('unknown')]),
   }),
});

export type LoginResponse = z.infer<typeof zLoginResponse>;
