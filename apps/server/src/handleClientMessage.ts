import { ClientMessage, ServerResponse } from 'shared';
import { match } from 'ts-pattern';
import { helloHandler } from './handlers/hello';
import { messageHandler } from './handlers/message';
import { sumHandler } from './handlers/sum';

export const handleClientMessage = (data: ClientMessage): ServerResponse => {
   console.log(`Received a "${data.type}" request...`);

   return match(data)
      .with({ type: 'hello' }, helloHandler)
      .with({ type: 'message' }, messageHandler)
      .with({ type: 'sum' }, sumHandler)
      .exhaustive();
};
