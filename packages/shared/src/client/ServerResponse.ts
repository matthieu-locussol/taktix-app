import { z } from 'zod';
import { zHelloResponse } from './schemas/responses/HelloResponse';
import { zMessageResponse } from './schemas/responses/MessageResponse';
import { zSumResponse } from './schemas/responses/SumResponse';

export const zServerResponse = z.discriminatedUnion('type', [
   zHelloResponse,
   zMessageResponse,
   zSumResponse,
]);

export type ServerResponse = z.infer<typeof zServerResponse>;
