import { z } from 'zod';
import { zTranslationKey } from '../data/translations';
import { ProfessionType, zProfessionType } from '../types/Profession';

export interface AuthRoomOptions {
   username: string;
   password: string;
}

export interface AuthRoomUserData {
   characters: {
      name: string;
      profession: ProfessionType;
      experience: number;
   }[];
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
         profession: zProfessionType,
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
            errorMessage: zTranslationKey,
            errorMessageOptions: z.record(z.string()),
         }),
         z.object({
            status: z.literal('success'),
            uuid: z.string(),
            map: z.string(),
            posX: z.number(),
            posY: z.number(),
            direction: z.string(),
            talents: z.string(),
            talentsPoints: z.number(),
            baseStatistics: z.string(),
            baseStatisticsPoints: z.number(),
            experience: z.number(),
            profession: zProfessionType,
         }),
      ]),
   }),
   z.object({
      type: z.literal('createCharacterResponse'),
      message: z.discriminatedUnion('status', [
         z.object({
            status: z.literal('error'),
            errorMessage: zTranslationKey,
            errorMessageOptions: z.record(z.string()),
         }),
         z.object({
            status: z.literal('success'),
            characters: z.array(
               z.object({
                  name: z.string(),
                  profession: zProfessionType,
               }),
            ),
         }),
      ]),
   }),
   z.object({
      type: z.literal('deleteCharacterResponse'),
      message: z.discriminatedUnion('status', [
         z.object({
            status: z.literal('error'),
            errorMessage: zTranslationKey,
            errorMessageOptions: z.record(z.string()),
         }),
         z.object({
            status: z.literal('success'),
            characters: z.array(
               z.object({
                  name: z.string(),
                  profession: zProfessionType,
               }),
            ),
         }),
      ]),
   }),
]);

export type AuthRoomResponse = z.infer<typeof zAuthRoomResponse>;

export const isAuthRoomResponse = (message: unknown): message is AuthRoomResponse =>
   zAuthRoomResponse.safeParse(message).success;
