import { ClientResponse, ServerMessage } from 'shared';
import { match } from 'ts-pattern';
import { handlePing } from './handlers/handlePing';

export const handleServerMessage = (message: ServerMessage): ClientResponse => {
   console.log(`Received a "${message.type}" message...`);

   return match(message).with({ type: 'ping' }, handlePing).exhaustive();
};
