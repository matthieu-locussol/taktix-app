import { z } from 'zod';
import { zPlayerLoggedInResponse } from './responses/PlayerLoggedInResponse';
import { zPlayerLoggedOutResponse } from './responses/PlayerLoggedOutResponse';
import { zPlayerMessageResponse } from './responses/PlayerMessageResponse';

export const zClientResponse = z.discriminatedUnion('type', [
   zPlayerLoggedInResponse,
   zPlayerMessageResponse,
   zPlayerLoggedOutResponse,
]);

export type ClientResponse = z.infer<typeof zClientResponse>;
