// This file has been automatically generated. DO NOT edit it manually.

import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

const rooms = [
   'AAA_InitialRoom',
   'MoonshadowBarRoom',
   'MoonshadowHamletRoom',
   'MoonshadowHotelRoom',
   'MoonshadowInnRoom',
] as const;

export const zRoom = ZodMgt.constructZodLiteralUnionType(rooms.map((room) => z.literal(room)));

export const isRoom = (value: unknown): value is Room => zRoom.safeParse(value).success;

export type Room = z.infer<typeof zRoom>;
