import { z } from 'zod';

export const zPlayerLoggedInResponse = z.object({
   type: z.literal('playerLoggedInResponse'),
   data: z.null(),
});

export type PlayerLoggedInResponse = z.infer<typeof zPlayerLoggedInResponse>;

export const zPlayerMessageResponse = z.object({
   type: z.literal('playerMessageResponse'),
   data: z.null(),
});

export type PlayerMessageResponse = z.infer<typeof zPlayerMessageResponse>;

export const zPlayerLoggedOutResponse = z.object({
   type: z.literal('playerLoggedOutResponse'),
   data: z.null(),
});

export type PlayerLoggedOutResponse = z.infer<typeof zPlayerLoggedOutResponse>;
export const zPlayerJoinMapResponse = z.object({
   type: z.literal('playerJoinMapResponse'),
   data: z.null(),
});

export type PlayerJoinMapResponse = z.infer<typeof zPlayerJoinMapResponse>;

export const zPlayerLeaveMapResponse = z.object({
   type: z.literal('playerLeaveMapResponse'),
   data: z.null(),
});

export type PlayerLeaveMapResponse = z.infer<typeof zPlayerLeaveMapResponse>;

export const zPlayerMoveResponse = z.object({
   type: z.literal('playerMoveResponse'),
   data: z.null(),
});

export type PlayerMoveResponse = z.infer<typeof zPlayerMoveResponse>;

export const zClientResponse = z.discriminatedUnion('type', [
   zPlayerLoggedInResponse,
   zPlayerMessageResponse,
   zPlayerLoggedOutResponse,
   zPlayerJoinMapResponse,
   zPlayerLeaveMapResponse,
   zPlayerMoveResponse,
]);

export type ClientResponse = z.infer<typeof zClientResponse>;
