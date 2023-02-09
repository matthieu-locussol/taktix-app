import { z } from 'zod';

export const zChangeMapMessage = z.object({
   type: z.literal('changeMap'),
   data: z.object({
      map: z.string(),
      x: z.number(),
      y: z.number(),
   }),
});

export type ChangeMapMessage = z.infer<typeof zChangeMapMessage>;
