import { z } from 'zod';
import { zHelloMessage } from './messages/HelloMessage';
import { zMessageMessage } from './messages/MessageMessage';
import { zSumMessage } from './messages/SumMessage';

export const zClientMessage = z.discriminatedUnion('type', [
   zHelloMessage,
   zMessageMessage,
   zSumMessage,
]);

export type ClientMessage = z.infer<typeof zClientMessage>;
