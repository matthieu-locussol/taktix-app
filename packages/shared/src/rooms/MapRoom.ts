import { z } from 'zod';
import { zPvEFightResults } from '../types/PvEFight';
import { Direction, Position } from '../types/SceneData';

export interface MapRoomOptions {
   uuid: string;
   position?: Position;
   direction?: Direction;
}

export interface MapRoomUserData {}

export const zMapRoomMessage = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('move'),
      message: z.object({
         x: z.number(),
         y: z.number(),
      }),
   }),
   z.object({
      type: z.literal('stopMoving'),
      message: z.object({
         x: z.number(),
         y: z.number(),
         direction: z.string(),
      }),
   }),
   z.object({
      type: z.literal('updateTalents'),
      message: z.object({
         talents: z.string(),
      }),
   }),
   z.object({
      type: z.literal('updateStatistics'),
      message: z.object({
         statistics: z.string(),
      }),
   }),
   z.object({
      type: z.literal('fightPvE'),
      message: z.object({
         monsterGroupId: z.number(),
      }),
   }),
]);

export type MapRoomMessage = z.infer<typeof zMapRoomMessage>;

export const isMapRoomMessage = (message: unknown): message is MapRoomMessage =>
   zMapRoomMessage.safeParse(message).success;

export const zMapRoomResponse = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('changeMap'),
      message: z.object({
         map: z.string(),
         x: z.number(),
         y: z.number(),
         direction: z.string(),
      }),
   }),
   z.object({
      type: z.literal('fightPvE'),
      message: z.object({
         results: zPvEFightResults,
      }),
   }),
]);

export type MapRoomResponse = z.infer<typeof zMapRoomResponse>;

export const isMapRoomResponse = (message: unknown): message is MapRoomResponse =>
   zMapRoomResponse.safeParse(message).success;
