import { z } from 'zod';
import { zPlayer } from '../types/Player';

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
         name: z.string(),
         status: z.literal('connected'),
         map: z.string(),
         posX: z.number(),
         posY: z.number(),
         players: z.array(zPlayer),
      }),
      z.object({
         status: z.literal('user_not_found'),
      }),
      z.object({
         status: z.literal('user_already_exist'),
      }),
   ]),
});

export const zChangeMapResponse = z.object({
   type: z.literal('changeMapResponse'),
   players: z.array(zPlayer),
});

export const zServerPacket = z.discriminatedUnion('type', [
   zPlayerLoggedInMessage,
   zPlayerMessageMessage,
   zPlayerLoggedOutMessage,
   zPlayerJoinMapMessage,
   zPlayerLeaveMapMessage,
   zPlayerMoveMessage,
   zLoginResponse,
   zChangeMapResponse,
]);

export type ServerPacket = z.infer<typeof zServerPacket>;
export type ServerPacketType<T extends ServerPacket['type']> = Extract<ServerPacket, { type: T }>;

export const isServerPacket = (value: unknown): value is ServerPacket =>
   zServerPacket.safeParse(value).success;
