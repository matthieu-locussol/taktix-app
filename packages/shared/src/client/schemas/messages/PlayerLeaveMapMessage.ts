import { z } from 'zod';

export const zPlayerLeaveMapMessage = z.object({
   type: z.literal('playerLeaveMap'),
   data: z.object({
      name: z.string(),
   }),
});

export type PlayerLeaveMapMessage = z.infer<typeof zPlayerLeaveMapMessage>;
