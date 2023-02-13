import { z } from 'zod';

export const zPlayer = z.object({
   nickname: z.string(),
   x: z.number(),
   y: z.number(),
});

export type Player = z.infer<typeof zPlayer>;
