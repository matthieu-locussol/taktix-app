import { z } from 'zod';

export interface AuthRoomOptions {
   username: string;
   password: string;
}

export interface AuthRoomUserData {
   characters: string[];
}

export const zAuthRoomMessage = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('selectCharacter'),
      message: z.object({
         characterName: z.string(),
      }),
   }),
   z.object({
      type: z.literal('createCharacter'),
      message: z.object({
         characterName: z.string(),
      }),
   }),
   z.object({
      type: z.literal('deleteCharacter'),
      message: z.object({
         characterName: z.string(),
         password: z.string(),
      }),
   }),
]);

export type AuthRoomMessage = z.infer<typeof zAuthRoomMessage>;

export const isAuthRoomMessage = (message: unknown): message is AuthRoomMessage =>
   zAuthRoomMessage.safeParse(message).success;

export const zAuthRoomResponse = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('selectCharacterResponse'),
      message: z.discriminatedUnion('status', [
         z.object({
            status: z.literal('error'),
            errorMessage: z.string(),
         }),
         z.object({
            status: z.literal('success'),
            uuid: z.string(),
            map: z.string(),
            posX: z.number(),
            posY: z.number(),
         }),
      ]),
   }),
   z.object({
      type: z.literal('createCharacterResponse'),
      message: z.discriminatedUnion('status', [
         z.object({
            status: z.literal('error'),
            errorMessage: z.string(),
         }),
         z.object({
            status: z.literal('success'),
            characters: z.array(z.string()),
         }),
      ]),
   }),
   z.object({
      type: z.literal('deleteCharacterResponse'),
      message: z.discriminatedUnion('status', [
         z.object({
            status: z.literal('error'),
            errorMessage: z.string(),
         }),
         z.object({
            status: z.literal('success'),
            characters: z.array(z.string()),
         }),
      ]),
   }),
]);

export type AuthRoomResponse = z.infer<typeof zAuthRoomResponse>;

export const isAuthRoomResponse = (message: unknown): message is AuthRoomResponse =>
   zAuthRoomResponse.safeParse(message).success;
