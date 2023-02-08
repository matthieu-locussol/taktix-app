import { z } from 'zod';
import { zChangeMapMessage } from './messages/ChangeMapMessage';
import { zLoginMessage } from './messages/LoginMessage';
import { zLogoutMessage } from './messages/LogoutMessage';
import { zMessageMessage } from './messages/MessageMessage';
import { zMoveMessage } from './messages/MoveMessage';

export const zClientMessage = z.discriminatedUnion('type', [
   zLoginMessage,
   zMessageMessage,
   zLogoutMessage,
   zMoveMessage,
   zChangeMapMessage,
]);

export type ClientMessage = z.infer<typeof zClientMessage>;
