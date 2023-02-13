import { z } from 'zod';

export const zPlayerLoggedInMessage = z.object({
   type: z.literal('playerLoggedIn'),
   name: z.string(),
});

export const zPlayerMessageMessage = z.object({
   type: z.literal('playerMessage'),
   name: z.string(),
   content: z.string(),
});

export const zPlayerLoggedOutMessage = z.object({
   type: z.literal('playerLoggedOut'),
   name: z.string(),
});

export const zPlayerJoinMapMessage = z.object({
   type: z.literal('playerJoinMap'),
   name: z.string(),
   x: z.number(),
   y: z.number(),
});

export const zPlayerLeaveMapMessage = z.object({
   type: z.literal('playerLeaveMap'),
   name: z.string(),
});

export const zPlayerMoveMessage = z.object({
   type: z.literal('playerMove'),
   name: z.string(),
   x: z.number(),
   y: z.number(),
});

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

export const zMessageResponse = z.object({
   type: z.literal('messageResponse'),
});

export const zLogoutResponse = z.object({
   type: z.literal('logoutResponse'),
   response: z.union([z.literal('success'), z.literal('unknown')]),
});

export const zMoveResponse = z.object({
   type: z.literal('moveResponse'),
});

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

export const zServerPacket = z.discriminatedUnion('type', [
   zPlayerLoggedInMessage,
   zPlayerMessageMessage,
   zPlayerLoggedOutMessage,
   zPlayerJoinMapMessage,
   zPlayerLeaveMapMessage,
   zPlayerMoveMessage,
   zLoginResponse,
   zMessageResponse,
   zLogoutResponse,
   zMoveResponse,
   zChangeMapResponse,
]);

export type ServerPacket = z.infer<typeof zServerPacket>;

export const isServerPacket = (value: unknown): value is ServerPacket =>
   zServerPacket.safeParse(value).success;
