import { z } from 'zod';
import { zLoginMessage } from './messages/LoginMessage';
import { zLogoutMessage } from './messages/LogoutMessage';
import { zMessageMessage } from './messages/MessageMessage';

export const zClientMessage = z.discriminatedUnion('type', [
   zLoginMessage,
   zMessageMessage,
   zLogoutMessage,
]);

export type ClientMessage = z.infer<typeof zClientMessage>;
