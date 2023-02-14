import { ClientPacket, ServerPacket } from 'shared';
import { match } from 'ts-pattern';
import { SocketId } from '../utils/socketId';
import { handleChangeMapMessage } from './packets/handleChangeMapMessage';
import { handleLoginMessage } from './packets/handleLoginMessage';
import { handleLogoutMessage } from './packets/handleLogoutMessage';
import { handleMessageMessage } from './packets/handleMessageMessage';
import { handleMoveMessage } from './packets/handleMoveMessage';

export const handleClientPacket = async (
   data: ClientPacket,
   socketId: SocketId,
): Promise<ServerPacket | null> => {
   console.log(`Received a "${data.type}" message...`);

   return match(data)
      .with({ type: 'login' }, (params) => handleLoginMessage(params, socketId))
      .with({ type: 'message' }, (params) => handleMessageMessage(params, socketId))
      .with({ type: 'logout' }, (params) => handleLogoutMessage(params, socketId))
      .with({ type: 'move' }, (params) => handleMoveMessage(params, socketId))
      .with({ type: 'changeMap' }, (params) => handleChangeMapMessage(params, socketId))
      .exhaustive();
};
