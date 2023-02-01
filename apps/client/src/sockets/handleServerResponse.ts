import { ServerResponse } from 'shared';
import { match } from 'ts-pattern';
import { handleHelloResponse } from './handlers/handleHelloResponse';
import { handleMessageResponse } from './handlers/handleMessageResponse';
import { handleSumResponse } from './handlers/handleSumResponse';

export const handleServerResponse = (response: ServerResponse): void => {
   console.log(`Received a "${response.type}" request...`);

   return match(response)
      .with({ type: 'helloResponse' }, handleHelloResponse)
      .with({ type: 'messageResponse' }, handleMessageResponse)
      .with({ type: 'sumResponse' }, handleSumResponse)
      .exhaustive();
};
