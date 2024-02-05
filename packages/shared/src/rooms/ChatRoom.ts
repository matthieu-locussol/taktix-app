import { z } from 'zod';

export interface ChatRoomOptions {
   uuid: string;
}

export interface ChatRoomUserData {}

export const zChatRoomMessage = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('message'),
      message: z.object({
         channel: z.number(),
         content: z.string(),
      }),
   }),
]);

export type ChatRoomMessage = z.infer<typeof zChatRoomMessage>;

export const isChatRoomMessage = (message: unknown): message is ChatRoomMessage =>
   zChatRoomMessage.safeParse(message).success;

export const zChatRoomResponse = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('message'),
      message: z.object({
         author: z.string(),
         channel: z.number(),
         content: z.string(),
      }),
   }),
   z.object({
      type: z.literal('privateMessage'),
      message: z.object({
         author: z.string(),
         target: z.string(),
         content: z.string(),
      }),
   }),
]);

export type ChatRoomResponse = z.infer<typeof zChatRoomResponse>;

export const isChatRoomResponse = (message: unknown): message is ChatRoomResponse =>
   zChatRoomResponse.safeParse(message).success;
