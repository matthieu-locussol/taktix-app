import { z } from 'zod';
import { zLoginResponse } from './responses/LoginResponse';
import { zLogoutResponse } from './responses/LogoutResponse';
import { zMessageResponse } from './responses/MessageResponse';

export const zServerResponse = z.discriminatedUnion('type', [
   zLoginResponse,
   zMessageResponse,
   zLogoutResponse,
]);

export type ServerResponse = z.infer<typeof zServerResponse>;
