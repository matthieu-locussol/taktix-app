import { z } from 'zod';

export const zPlayerLeaveMapResponse = z.object({
   type: z.literal('playerLeaveMapResponse'),
   data: z.null(),
});

export type PlayerLeaveMapResponse = z.infer<typeof zPlayerLeaveMapResponse>;
