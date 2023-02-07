import { ClientMessage, ServerResponse } from 'shared';
import { match } from 'ts-pattern';
import { handleLoginMessage } from './messages/handleLoginMessage';
import { handleLogoutMessage } from './messages/handleLogoutMessage';
import { handleMessageMessage } from './messages/handleMessageMessage';
import { handleMoveMessage } from './messages/handleMoveMessage';

export const handleClientMessage = async (
   data: ClientMessage,
   socketId: string,
): Promise<ServerResponse> => {
   console.log(`Received a "${data.type}" message...`);

   return match(data)
      .with({ type: 'login' }, (params) => handleLoginMessage(params, socketId))
      .with({ type: 'message' }, (params) => handleMessageMessage(params, socketId))
      .with({ type: 'logout' }, (params) => handleLogoutMessage(params, socketId))
      .with({ type: 'move' }, (params) => handleMoveMessage(params, socketId))
      .exhaustive();
};
