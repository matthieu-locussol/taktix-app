import { z } from 'zod';

export const zChangeMapResponse = z.object({
   type: z.literal('changeMapResponse'),
   data: z.null(),
});

export type ChangeMapResponse = z.infer<typeof zChangeMapResponse>;
