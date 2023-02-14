import { ClientPacket } from 'shared';
import { match } from 'ts-pattern';
import { SocketId } from '../utils/socketId';
import { handleChangeMap } from './packets/handleChangeMap';
import { handleLogin } from './packets/handleLogin';
import { handleLogout } from './packets/handleLogout';
import { handleMessage } from './packets/handleMessage';
import { handleMove } from './packets/handleMove';

export const handleClientPacket = async (data: ClientPacket, socketId: SocketId): Promise<void> => {
   console.log(`Received a "${data.type}" message...`);

   return match(data)
      .with({ type: 'login' }, (params) => handleLogin(params, socketId))
      .with({ type: 'message' }, (params) => handleMessage(params, socketId))
      .with({ type: 'logout' }, (params) => handleLogout(params, socketId))
      .with({ type: 'move' }, (params) => handleMove(params, socketId))
      .with({ type: 'changeMap' }, (params) => handleChangeMap(params, socketId))
      .exhaustive();
};
