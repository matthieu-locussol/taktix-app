import { z } from 'zod';

export const zLoginMessage = z.object({
   type: z.literal('login'),
   username: z.string(),
   password: z.string(),
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

export const zClientPacket = z.discriminatedUnion('type', [
   zLoginMessage,
   zMessageMessage,
   zLogoutMessage,
   zMoveMessage,
   zChangeMapMessage,
]);

export type ClientPacket = z.infer<typeof zClientPacket>;
export type ClientPacketType<T extends ClientPacket['type']> = Extract<ClientPacket, { type: T }>;

export const isClientPacket = (value: unknown): value is ClientPacket =>
   zClientPacket.safeParse(value).success;
