import { z } from 'zod';
import { zPlayerLoggedInMessage } from './messages/PlayerLoggedInMessage';
import { zPlayerLoggedOutMessage } from './messages/PlayerLoggedOutMessage';
import { zPlayerMessageMessage } from './messages/PlayerMessageMessage';

export const zServerMessage = z.discriminatedUnion('type', [
   zPlayerLoggedInMessage,
   zPlayerMessageMessage,
   zPlayerLoggedOutMessage,
]);

export type ServerMessage = z.infer<typeof zServerMessage>;
