import { z } from 'zod';

export const zPlayer = z.object({
   nickname: z.string(),
   x: z.number(),
   y: z.number(),
});

export type Player = z.infer<typeof zPlayer>;

export const INTERNAL_PLAYER_NAME = 'cd8bbb6c-a16d-49ae-b671-868bfc8acace';
