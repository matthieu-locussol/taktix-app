import { ClientPacket } from 'shared';
import { match } from 'ts-pattern';
import { SocketId } from '../utils/socketId';
import { handleChangeMap } from './packets/handleChangeMap';
import { handleCreateCharacter } from './packets/handleCreateCharacter';
import { handleLogin } from './packets/handleLogin';
import { handleLogout } from './packets/handleLogout';
import { handleMessage } from './packets/handleMessage';
import { handleMove } from './packets/handleMove';
import { handleSelectCharacter } from './packets/handleSelectCharacter';

export const handleClientPacket = async (data: ClientPacket, socketId: SocketId): Promise<void> =>
   match(data)
      .with({ type: 'login' }, (params) => handleLogin(params, socketId))
      .with({ type: 'selectCharacter' }, (params) => handleSelectCharacter(params, socketId))
      .with({ type: 'createCharacter' }, (params) => handleCreateCharacter(params, socketId))
      .with({ type: 'message' }, (params) => handleMessage(params, socketId))
      .with({ type: 'logout' }, (params) => handleLogout(params, socketId))
      .with({ type: 'move' }, (params) => handleMove(params, socketId))
      .with({ type: 'changeMap' }, (params) => handleChangeMap(params, socketId))
      .exhaustive();
