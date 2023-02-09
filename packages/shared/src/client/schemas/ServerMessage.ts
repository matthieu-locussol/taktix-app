import { z } from 'zod';
import { zPlayerJoinMapMessage } from './messages/PlayerJoinMapMessage';
import { zPlayerLoggedInMessage } from './messages/PlayerLoggedInMessage';
import { zPlayerLoggedOutMessage } from './messages/PlayerLoggedOutMessage';
import { zPlayerMessageMessage } from './messages/PlayerMessageMessage';

export const zServerMessage = z.discriminatedUnion('type', [
   zPlayerLoggedInMessage,
   zPlayerMessageMessage,
   zPlayerLoggedOutMessage,
   zPlayerJoinMapMessage,
]);

export type ServerMessage = z.infer<typeof zServerMessage>;
