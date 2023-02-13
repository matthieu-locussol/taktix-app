import { z } from 'zod';

export const zLoginMessage = z.object({
   type: z.literal('login'),
   name: z.string(),
});

export const zMessageMessage = z.object({
   type: z.literal('message'),
   name: z.string(),
   content: z.string(),
});

export const zLogoutMessage = z.object({
   type: z.literal('logout'),
   name: z.string(),
});

export const zMoveMessage = z.object({
   type: z.literal('move'),
   posX: z.number(),
   posY: z.number(),
});

export const zChangeMapMessage = z.object({
   type: z.literal('changeMap'),
   map: z.string(),
   x: z.number(),
   y: z.number(),
});

export const zPlayerLoggedInResponse = z.object({
   type: z.literal('playerLoggedInResponse'),
});

export const zPlayerMessageResponse = z.object({
   type: z.literal('playerMessageResponse'),
});

export const zPlayerLoggedOutResponse = z.object({
   type: z.literal('playerLoggedOutResponse'),
});

export const zPlayerJoinMapResponse = z.object({
   type: z.literal('playerJoinMapResponse'),
});

export const zPlayerLeaveMapResponse = z.object({
   type: z.literal('playerLeaveMapResponse'),
});

export const zPlayerMoveResponse = z.object({
   type: z.literal('playerMoveResponse'),
});

export const zClientPacket = z.discriminatedUnion('type', [
   zLoginMessage,
   zMessageMessage,
   zLogoutMessage,
   zMoveMessage,
   zChangeMapMessage,
   zPlayerLoggedInResponse,
   zPlayerMessageResponse,
   zPlayerLoggedOutResponse,
   zPlayerJoinMapResponse,
   zPlayerLeaveMapResponse,
   zPlayerMoveResponse,
]);

export type ClientPacket = z.infer<typeof zClientPacket>;
export type ClientPacketType<T extends ClientPacket['type']> = Extract<ClientPacket, { type: T }>;

export const isClientPacket = (value: unknown): value is ClientPacket =>
   zClientPacket.safeParse(value).success;
