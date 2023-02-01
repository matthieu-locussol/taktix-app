import { z } from 'zod';
import { zHelloMessage } from './schemas/HelloMessage';
import { zMessageMessage } from './schemas/MessageMessage';
import { zSumMessage } from './schemas/SumMessage';

export const zClientMessage = z.discriminatedUnion('type', [
   zHelloMessage,
   zMessageMessage,
   zSumMessage,
]);

export type ClientMessage = z.infer<typeof zClientMessage>;
