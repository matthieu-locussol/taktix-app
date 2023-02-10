import { ServerResponse } from 'shared/src/client/schemas/ServerResponse';
import { ClientMessage } from 'shared/src/server/schemas/ClientMessage';
import { match } from 'ts-pattern';
import { handleChangeMapMessage } from './messages/handleChangeMapMessage';
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
      .with({ type: 'changeMap' }, (params) => handleChangeMapMessage(params, socketId))
      .exhaustive();
};
