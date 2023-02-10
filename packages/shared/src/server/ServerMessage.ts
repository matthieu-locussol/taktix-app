import { z } from 'zod';

export const zPlayerLoggedInMessage = z.object({
   type: z.literal('playerLoggedIn'),
   data: z.object({
      name: z.string(),
   }),
});

export type PlayerLoggedInMessage = z.infer<typeof zPlayerLoggedInMessage>;

export const zPlayerMessageMessage = z.object({
   type: z.literal('playerMessage'),
   data: z.object({
      name: z.string(),
      content: z.string(),
   }),
});

export type PlayerMessageMessage = z.infer<typeof zPlayerMessageMessage>;

export const zPlayerLoggedOutMessage = z.object({
   type: z.literal('playerLoggedOut'),
   data: z.object({
      name: z.string(),
   }),
});

export type PlayerLoggedOutMessage = z.infer<typeof zPlayerLoggedOutMessage>;

export const zPlayerJoinMapMessage = z.object({
   type: z.literal('playerJoinMap'),
   data: z.object({
      name: z.string(),
      x: z.number(),
      y: z.number(),
   }),
});

export type PlayerJoinMapMessage = z.infer<typeof zPlayerJoinMapMessage>;

export const zPlayerLeaveMapMessage = z.object({
   type: z.literal('playerLeaveMap'),
   data: z.object({
      name: z.string(),
   }),
});

export type PlayerLeaveMapMessage = z.infer<typeof zPlayerLeaveMapMessage>;

export const zPlayerMoveMessage = z.object({
   type: z.literal('playerMove'),
   data: z.object({
      name: z.string(),
      x: z.number(),
      y: z.number(),
   }),
});

export type PlayerMoveMessage = z.infer<typeof zPlayerMoveMessage>;

export const zServerMessage = z.discriminatedUnion('type', [
   zPlayerLoggedInMessage,
   zPlayerMessageMessage,
   zPlayerLoggedOutMessage,
   zPlayerJoinMapMessage,
   zPlayerLeaveMapMessage,
   zPlayerMoveMessage,
]);

export type ServerMessage = z.infer<typeof zServerMessage>;
