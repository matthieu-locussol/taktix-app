import { ServerResponse } from 'shared';
import { match } from 'ts-pattern';
import { handleHelloResponse } from './handlers/handleHelloResponse';
import { handleMessageResponse } from './handlers/handleMessageResponse';
import { handleSumResponse } from './handlers/handleSumResponse';

export const handleServerResponse = (data: ServerResponse): void => {
   console.log(`Received a "${data.type}" request...`);

   return match(data)
      .with({ type: 'helloResponse' }, handleHelloResponse)
      .with({ type: 'messageResponse' }, handleMessageResponse)
      .with({ type: 'sumResponse' }, handleSumResponse)
      .exhaustive();
};
