import { ClientResponse, ServerMessage } from 'shared';
import { match } from 'ts-pattern';
import { handlePlayerJoinMapMessage } from './messages/handlePlayerJoinMapMessage';
import { handlePlayerLeaveMapMessage } from './messages/handlePlayerLeaveMapMessage';
import { handlePlayerLoggedInMessage } from './messages/handlePlayerLoggedInMessage';
import { handlePlayerLoggedOutMessage } from './messages/handlePlayerLoggedOutMessage';
import { handlePlayerMessageMessage } from './messages/handlePlayerMessageMessage';
import { handlePlayerMoveMessage } from './messages/handlePlayerMoveMessage';

export const handleServerMessage = (message: ServerMessage): ClientResponse =>
   match(message)
      .with({ type: 'playerLoggedIn' }, handlePlayerLoggedInMessage)
      .with({ type: 'playerMessage' }, handlePlayerMessageMessage)
      .with({ type: 'playerLoggedOut' }, handlePlayerLoggedOutMessage)
      .with({ type: 'playerJoinMap' }, handlePlayerJoinMapMessage)
      .with({ type: 'playerLeaveMap' }, handlePlayerLeaveMapMessage)
      .with({ type: 'playerMove' }, handlePlayerMoveMessage)
      .exhaustive();
