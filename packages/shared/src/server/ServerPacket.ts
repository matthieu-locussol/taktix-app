import { z } from 'zod';
import { zServerMessage } from './ServerMessage';
import { zServerResponse } from './ServerResponse';

export const zServerPacket = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('message'),
      packet: zServerMessage,
   }),
   z.object({
      type: z.literal('response'),
      packet: zServerResponse,
   }),
]);

export type ServerPacket = z.infer<typeof zServerPacket>;
