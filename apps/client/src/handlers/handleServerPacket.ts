import { ClientPacket, ServerPacket } from 'shared';
import { match } from 'ts-pattern';
import { handleChangeMapResponse } from './packets/handleChangeMapResponse';
import { handleLoginResponse } from './packets/handleLoginResponse';
import { handleLogoutResponse } from './packets/handleLogoutResponse';
import { handleMessageResponse } from './packets/handleMessageResponse';
import { handleMoveResponse } from './packets/handleMoveResponse';
import { handlePlayerJoinMapMessage } from './packets/handlePlayerJoinMapMessage';
import { handlePlayerLeaveMapMessage } from './packets/handlePlayerLeaveMapMessage';
import { handlePlayerLoggedInMessage } from './packets/handlePlayerLoggedInMessage';
import { handlePlayerLoggedOutMessage } from './packets/handlePlayerLoggedOutMessage';
import { handlePlayerMessageMessage } from './packets/handlePlayerMessageMessage';
import { handlePlayerMoveMessage } from './packets/handlePlayerMoveMessage';

export const handleServerPacket = (message: ServerPacket): ClientPacket | null =>
   match(message)
      .with({ type: 'playerLoggedIn' }, handlePlayerLoggedInMessage)
      .with({ type: 'playerMessage' }, handlePlayerMessageMessage)
      .with({ type: 'playerLoggedOut' }, handlePlayerLoggedOutMessage)
      .with({ type: 'playerJoinMap' }, handlePlayerJoinMapMessage)
      .with({ type: 'playerLeaveMap' }, handlePlayerLeaveMapMessage)
      .with({ type: 'playerMove' }, handlePlayerMoveMessage)
      .with({ type: 'loginResponse' }, handleLoginResponse)
      .with({ type: 'messageResponse' }, handleMessageResponse)
      .with({ type: 'logoutResponse' }, handleLogoutResponse)
      .with({ type: 'moveResponse' }, handleMoveResponse)
      .with({ type: 'changeMapResponse' }, handleChangeMapResponse)
      .exhaustive();
