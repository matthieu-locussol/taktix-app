import { ClientMessage, ServerResponse } from 'shared';
import { match } from 'ts-pattern';
import { handleHelloMessage } from './handlers/messages/handleHelloMessage';
import { handleMessageMessage } from './handlers/messages/handleMessageMessage';
import { handleSumMessage } from './handlers/messages/handleSumMessage';

export const handleClientMessage = (data: ClientMessage): ServerResponse => {
   console.log(`Received a "${data.type}" message...`);

   return match(data)
      .with({ type: 'hello' }, handleHelloMessage)
      .with({ type: 'message' }, handleMessageMessage)
      .with({ type: 'sum' }, handleSumMessage)
      .exhaustive();
};
