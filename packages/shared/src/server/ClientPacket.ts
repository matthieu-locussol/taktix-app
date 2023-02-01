import { z } from 'zod';
import { zClientMessage } from './schemas/ClientMessage';
import { zClientResponse } from './schemas/ClientResponse';

export const zClientPacket = z.discriminatedUnion('type', [
   z.object({
      type: z.literal('message'),
      packet: zClientMessage,
   }),
   z.object({
      type: z.literal('response'),
      packet: zClientResponse,
   }),
]);

export type ClientPacket = z.infer<typeof zClientPacket>;
