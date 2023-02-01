import { ClientResponse } from 'shared';
import { match } from 'ts-pattern';
import { pingHandler } from './handlers/ping';

export const handleClientResponse = (data: ClientResponse): void => {
   console.log(`Received a "${data.type}" response...`);

   return match(data).with({ type: 'pingResponse' }, pingHandler).exhaustive();
};
