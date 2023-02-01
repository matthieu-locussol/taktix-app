import { z } from 'zod';
import { zHelloResponse } from './responses/HelloResponse';
import { zMessageResponse } from './responses/MessageResponse';
import { zSumResponse } from './responses/SumResponse';

export const zServerResponse = z.discriminatedUnion('type', [
   zHelloResponse,
   zMessageResponse,
   zSumResponse,
]);

export type ServerResponse = z.infer<typeof zServerResponse>;
