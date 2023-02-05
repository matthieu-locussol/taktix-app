import { z } from 'zod';

export const zLogoutMessage = z.object({
   type: z.literal('logout'),
   data: z.object({
      name: z.string(),
   }),
});

export type LogoutMessage = z.infer<typeof zLogoutMessage>;
