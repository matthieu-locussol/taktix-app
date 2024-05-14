import { z } from 'zod';
import { zInteraction } from '../types/Interaction';
import { zItem, zItemRarity } from '../types/Item';
import { zPvEFightResults } from '../types/PvEFight';
import { zRoom } from '../types/Room';
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
         id: z.string(),
         monsterGroupId: z.number(),
      }),
   }),
   z.object({
      type: z.literal('stopFighting'),
      message: z.object({}),
   }),
   z.object({
      type: z.literal('teleport'),
      message: z.object({
         room: zRoom,
      }),
   }),
   z.object({
      type: z.literal('equipItem'),
      message: z.object({
         id: z.number(),
      }),
   }),
   z.object({
      type: z.literal('unequipItem'),
      message: z.object({
         id: z.number(),
      }),
   }),
   z.object({
      type: z.literal('interact'),
      message: z.object({
         id: zInteraction,
      }),
   }),
   z.object({
      type: z.literal('recycle'),
      message: z.object({
         itemsIds: z.array(z.number()),
      }),
   }),
   z.object({
      type: z.literal('spinWheel'),
      message: z.object({}),
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
         money: z.number().optional(),
      }),
   }),
   z.object({
      type: z.literal('fightPvE'),
      message: z.object({
         results: zPvEFightResults,
         alliesMoney: z.record(z.string(), z.number()),
      }),
   }),
   z.object({
      type: z.literal('equipItemResponse'),
      message: z.object({
         success: z.boolean(),
      }),
   }),
   z.object({
      type: z.literal('unequipItemResponse'),
      message: z.object({
         success: z.boolean(),
      }),
   }),
   z.object({
      type: z.literal('interactResponse'),
      message: z.object({
         id: zInteraction,
         success: z.boolean(),
      }),
   }),
   z.object({
      type: z.literal('recycleResponse'),
      message: z.object({
         success: z.boolean(),
         gachix: z.number(),
         itemsDestroyed: z.array(z.number()),
      }),
   }),
   z.object({
      type: z.literal('spinWheelResponse'),
      message: z.object({
         success: z.boolean(),
         item: zItem.nullable(),
         itemRarity: zItemRarity.nullable(),
         lootBonus: z.number().nullable(),
      }),
   }),
]);

export type MapRoomResponse = z.infer<typeof zMapRoomResponse>;

export const isMapRoomResponse = (message: unknown): message is MapRoomResponse =>
   zMapRoomResponse.safeParse(message).success;
