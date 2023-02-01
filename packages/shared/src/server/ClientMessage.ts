import { z } from 'zod';
import { zHelloMessage } from './schemas/messages/HelloMessage';
import { zMessageMessage } from './schemas/messages/MessageMessage';
import { zSumMessage } from './schemas/messages/SumMessage';

export const zClientMessage = z.discriminatedUnion('type', [
   zHelloMessage,
   zMessageMessage,
   zSumMessage,
]);

export type ClientMessage = z.infer<typeof zClientMessage>;
