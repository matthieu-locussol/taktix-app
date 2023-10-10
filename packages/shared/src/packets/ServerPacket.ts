import { z } from 'zod';
import { zPlayer } from '../types/Player';

export const zPlayerLoggedInMessage = z.object({
   type: z.literal('playerLoggedIn'),
   name: z.string(),
});

export const zPlayerMessageMessage = z.object({
   type: z.literal('playerMessage'),
   name: z.string(),
   content: z.string(),
});

export const zPlayerLoggedOutMessage = z.object({
   type: z.literal('playerLoggedOut'),
   name: z.string(),
});

export const zPlayerJoinMapMessage = z.object({
   type: z.literal('playerJoinMap'),
   name: z.string(),
   x: z.number(),
   y: z.number(),
});

export const zPlayerLeaveMapMessage = z.object({
   type: z.literal('playerLeaveMap'),
   name: z.string(),
});

export const zPlayerMoveMessage = z.object({
   type: z.literal('playerMove'),
   name: z.string(),
   x: z.number(),
   y: z.number(),
});

export const zLoginResponse = z.object({
   type: z.literal('loginResponse'),
   response: z.union([
      z.object({
         status: z.literal('user_not_found'),
      }),
      z.object({
         status: z.literal('user_found'),
         characters: z.array(
            z.object({
               name: z.string(),
            }),
         ),
      }),
   ]),
});

export const zSelectCharacterResponse = z.object({
   type: z.literal('selectCharacterResponse'),
   response: z.union([
      z.object({
         status: z.literal('connected'),
         name: z.string(),
         map: z.string(),
         posX: z.number(),
         posY: z.number(),
         players: z.array(zPlayer),
      }),
      z.object({
         status: z.literal('character_not_found'),
      }),
      z.object({
         status: z.literal('wrong_user'),
      }),
   ]),
});

export const zCreateCharacterResponse = z.object({
   type: z.literal('createCharacterResponse'),
   response: z.union([
      z.object({
         status: z.literal('character_created'),
         characters: z.array(z.object({ name: z.string() })),
      }),
      z.object({
         status: z.literal('error'),
         errorMessage: z.string(),
      }),
   ]),
});

export const zDeleteCharacterResponse = z.object({
   type: z.literal('deleteCharacterResponse'),
   response: z.union([
      z.object({
         status: z.literal('character_deleted'),
         characters: z.array(z.object({ name: z.string() })),
      }),
      z.object({
         status: z.literal('error'),
         errorMessage: z.string(),
      }),
   ]),
});

export const zChangeMapResponse = z.object({
   type: z.literal('changeMapResponse'),
   players: z.array(zPlayer),
});

export const zServerPacket = z.discriminatedUnion('type', [
   zPlayerLoggedInMessage,
   zPlayerMessageMessage,
   zPlayerLoggedOutMessage,
   zPlayerJoinMapMessage,
   zPlayerLeaveMapMessage,
   zPlayerMoveMessage,
   zLoginResponse,
   zSelectCharacterResponse,
   zCreateCharacterResponse,
   zDeleteCharacterResponse,
   zChangeMapResponse,
]);

export type ServerPacket = z.infer<typeof zServerPacket>;
export type ServerPacketType<T extends ServerPacket['type']> = Extract<ServerPacket, { type: T }>;

export const isServerPacket = (value: unknown): value is ServerPacket =>
   zServerPacket.safeParse(value).success;
