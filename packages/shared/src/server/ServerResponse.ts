import { z } from 'zod';

export const zLoginResponse = z.object({
   type: z.literal('loginResponse'),
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
});

export type LoginResponse = z.infer<typeof zLoginResponse>;

export const zMessageResponse = z.object({
   type: z.literal('messageResponse'),
});

export type MessageResponse = z.infer<typeof zMessageResponse>;

export const zLogoutResponse = z.object({
   type: z.literal('logoutResponse'),
   response: z.union([z.literal('success'), z.literal('unknown')]),
});

export type LogoutResponse = z.infer<typeof zLogoutResponse>;

export const zMoveResponse = z.object({
   type: z.literal('moveResponse'),
});

export type MoveResponse = z.infer<typeof zMoveResponse>;

export const zChangeMapResponse = z.object({
   type: z.literal('changeMapResponse'),
   players: z.array(
      z.object({
         name: z.string(),
         posX: z.number(),
         posY: z.number(),
      }),
   ),
});

export type ChangeMapResponse = z.infer<typeof zChangeMapResponse>;

export const zServerResponse = z.discriminatedUnion('type', [
   zLoginResponse,
   zMessageResponse,
   zLogoutResponse,
   zMoveResponse,
   zChangeMapResponse,
]);

export type ServerResponse = z.infer<typeof zServerResponse>;
