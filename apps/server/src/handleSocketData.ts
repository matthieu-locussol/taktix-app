import { SocketSchema } from 'shared';
import { match } from 'ts-pattern';
import { helloHandler } from './handlers/hello';
import { messageHandler } from './handlers/message';
import { sumHandler } from './handlers/sum';

export const handleSocketData = (socketData: SocketSchema): string => {
   console.log(`Received a "${socketData.type}" request...`);

   return match(socketData)
      .with({ type: 'hello' }, helloHandler)
      .with({ type: 'message' }, messageHandler)
      .with({ type: 'sum' }, sumHandler)
      .exhaustive();
};
