import { ServerResponse } from 'shared';
import { match } from 'ts-pattern';
import { handleHelloResponse } from './responses/handleHelloResponse';
import { handleMessageResponse } from './responses/handleMessageResponse';
import { handleSumResponse } from './responses/handleSumResponse';

export const handleServerResponse = (response: ServerResponse): void => {
   console.log(`Received a "${response.type}" request...`);

   return match(response)
      .with({ type: 'helloResponse' }, handleHelloResponse)
      .with({ type: 'messageResponse' }, handleMessageResponse)
      .with({ type: 'sumResponse' }, handleSumResponse)
      .exhaustive();
};
