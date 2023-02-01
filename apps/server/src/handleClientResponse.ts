import { ClientResponse } from 'shared';
import { match } from 'ts-pattern';
import { handlePingResponse } from './handlers/responses/handlePingResponse';

export const handleClientResponse = (data: ClientResponse): void => {
   console.log(`Received a "${data.type}" response...`);

   return match(data).with({ type: 'pingResponse' }, handlePingResponse).exhaustive();
};
