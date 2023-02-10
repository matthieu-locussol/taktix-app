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

export const zClientMessage = z.discriminatedUnion('type', [
   zLoginMessage,
   zMessageMessage,
   zLogoutMessage,
   zMoveMessage,
   zChangeMapMessage,
]);

export type ClientMessage = z.infer<typeof zClientMessage>;
