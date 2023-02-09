import { z } from 'zod';
import { zPlayerJoinMapResponse } from './responses/PlayerJoinMapResponse';
import { zPlayerLeaveMapResponse } from './responses/PlayerLeaveMapResponse';
import { zPlayerLoggedInResponse } from './responses/PlayerLoggedInResponse';
import { zPlayerLoggedOutResponse } from './responses/PlayerLoggedOutResponse';
import { zPlayerMessageResponse } from './responses/PlayerMessageResponse';
import { zPlayerMoveResponse } from './responses/PlayerMoveResponse';

export const zClientResponse = z.discriminatedUnion('type', [
   zPlayerLoggedInResponse,
   zPlayerMessageResponse,
   zPlayerLoggedOutResponse,
   zPlayerJoinMapResponse,
   zPlayerLeaveMapResponse,
   zPlayerMoveResponse,
]);

export type ClientResponse = z.infer<typeof zClientResponse>;
