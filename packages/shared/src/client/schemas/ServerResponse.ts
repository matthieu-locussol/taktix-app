import { z } from 'zod';
import { zChangeMapResponse } from './responses/ChangeMapResponse';
import { zLoginResponse } from './responses/LoginResponse';
import { zLogoutResponse } from './responses/LogoutResponse';
import { zMessageResponse } from './responses/MessageResponse';
import { zMoveResponse } from './responses/MoveResponse';

export const zServerResponse = z.discriminatedUnion('type', [
   zLoginResponse,
   zMessageResponse,
   zLogoutResponse,
   zMoveResponse,
   zChangeMapResponse,
]);

export type ServerResponse = z.infer<typeof zServerResponse>;
