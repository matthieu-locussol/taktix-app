import { z } from 'zod';

export const zLoginResponse = z.object({
   type: z.literal('loginResponse'),
   data: z.object({
      response: z.union([
         z.object({
            status: z.literal('connected'),
            map: z.string(),
            posX: z.number(),
            posY: z.number(),
            players: z.array(
               z.object({
                  name: z.string(),
                  posX: z.number(),
                  posY: z.number(),
               }),
            ),
         }),
         z.object({
            status: z.literal('unknown'),
         }),
      ]),
   }),
});

export type LoginResponse = z.infer<typeof zLoginResponse>;
