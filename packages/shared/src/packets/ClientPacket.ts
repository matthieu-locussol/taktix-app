import { z } from 'zod';

export const zLoginMessage = z.object({
   type: z.literal('login'),
   name: z.string(),
});

export type LoginMessage = z.infer<typeof zLoginMessage>;

export const zMessageMessage = z.object({
   type: z.literal('message'),
   name: z.string(),
   content: z.string(),
});

export type MessageMessage = z.infer<typeof zMessageMessage>;

export const zLogoutMessage = z.object({
   type: z.literal('logout'),
   name: z.string(),
});

export type LogoutMessage = z.infer<typeof zLogoutMessage>;

export const zMoveMessage = z.object({
   type: z.literal('move'),
   posX: z.number(),
   posY: z.number(),
});

export type MoveMessage = z.infer<typeof zMoveMessage>;

export const zChangeMapMessage = z.object({
   type: z.literal('changeMap'),
   map: z.string(),
   x: z.number(),
   y: z.number(),
});

export type ChangeMapMessage = z.infer<typeof zChangeMapMessage>;

export const zPlayerLoggedInResponse = z.object({
   type: z.literal('playerLoggedInResponse'),
});

export type PlayerLoggedInResponse = z.infer<typeof zPlayerLoggedInResponse>;

export const zPlayerMessageResponse = z.object({
   type: z.literal('playerMessageResponse'),
});

export type PlayerMessageResponse = z.infer<typeof zPlayerMessageResponse>;

export const zPlayerLoggedOutResponse = z.object({
   type: z.literal('playerLoggedOutResponse'),
});

export type PlayerLoggedOutResponse = z.infer<typeof zPlayerLoggedOutResponse>;
export const zPlayerJoinMapResponse = z.object({
   type: z.literal('playerJoinMapResponse'),
});

export type PlayerJoinMapResponse = z.infer<typeof zPlayerJoinMapResponse>;

export const zPlayerLeaveMapResponse = z.object({
   type: z.literal('playerLeaveMapResponse'),
});

export type PlayerLeaveMapResponse = z.infer<typeof zPlayerLeaveMapResponse>;

export const zPlayerMoveResponse = z.object({
   type: z.literal('playerMoveResponse'),
});

export type PlayerMoveResponse = z.infer<typeof zPlayerMoveResponse>;

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

export const isClientPacket = (value: unknown): value is ClientPacket =>
   zClientPacket.safeParse(value).success;
