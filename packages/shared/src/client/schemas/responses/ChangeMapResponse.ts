import { z } from 'zod';

export const zChangeMapResponse = z.object({
   type: z.literal('changeMapResponse'),
   data: z.object({
      players: z.array(
         z.object({
            name: z.string(),
            posX: z.number(),
            posY: z.number(),
         }),
      ),
   }),
});

export type ChangeMapResponse = z.infer<typeof zChangeMapResponse>;
