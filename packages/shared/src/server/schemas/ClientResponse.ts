import { z } from 'zod';
import { zPlayerJoinMapResponse } from './responses/PlayerJoinMapResponse';
import { zPlayerLoggedInResponse } from './responses/PlayerLoggedInResponse';
import { zPlayerLoggedOutResponse } from './responses/PlayerLoggedOutResponse';
import { zPlayerMessageResponse } from './responses/PlayerMessageResponse';

export const zClientResponse = z.discriminatedUnion('type', [
   zPlayerLoggedInResponse,
   zPlayerMessageResponse,
   zPlayerLoggedOutResponse,
   zPlayerJoinMapResponse,
]);

export type ClientResponse = z.infer<typeof zClientResponse>;
