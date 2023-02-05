import { ClientResponse, ServerMessage } from 'shared';
import { match } from 'ts-pattern';
import { handlePlayerLoggedInMessage } from './messages/handlePlayerLoggedInMessage';
import { handlePlayerLoggedOutMessage } from './messages/handlePlayerLoggedOutMessage';
import { handlePlayerMessageMessage } from './messages/handlePlayerMessageMessage';

export const handleServerMessage = (message: ServerMessage): ClientResponse =>
   match(message)
      .with({ type: 'playerLoggedIn' }, handlePlayerLoggedInMessage)
      .with({ type: 'playerMessage' }, handlePlayerMessageMessage)
      .with({ type: 'playerLoggedOut' }, handlePlayerLoggedOutMessage)
      .exhaustive();
