import { z } from 'zod';

export const zLogoutResponse = z.object({
   type: z.literal('logoutResponse'),
   data: z.object({
      response: z.union([z.literal('success'), z.literal('unknown')]),
   }),
});

export type LogoutResponse = z.infer<typeof zLogoutResponse>;
