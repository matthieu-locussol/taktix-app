import { z } from 'zod';
import { zPlayerJoinMapMessage } from './messages/PlayerJoinMapMessage';
import { zPlayerLeaveMapMessage } from './messages/PlayerLeaveMapMessage';
import { zPlayerLoggedInMessage } from './messages/PlayerLoggedInMessage';
import { zPlayerLoggedOutMessage } from './messages/PlayerLoggedOutMessage';
import { zPlayerMessageMessage } from './messages/PlayerMessageMessage';
import { zPlayerMoveMessage } from './messages/PlayerMoveMessage';

export const zServerMessage = z.discriminatedUnion('type', [
   zPlayerLoggedInMessage,
   zPlayerMessageMessage,
   zPlayerLoggedOutMessage,
   zPlayerJoinMapMessage,
   zPlayerLeaveMapMessage,
   zPlayerMoveMessage,
]);

export type ServerMessage = z.infer<typeof zServerMessage>;
