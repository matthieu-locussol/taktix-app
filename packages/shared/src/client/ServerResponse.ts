import { z } from 'zod';
import { zHelloResponse } from './schemas/HelloResponse';
import { zMessageResponse } from './schemas/MessageResponse';
import { zSumResponse } from './schemas/SumResponse';

export const zServerResponse = z.discriminatedUnion('type', [
   zHelloResponse,
   zMessageResponse,
   zSumResponse,
]);

export type ServerResponse = z.infer<typeof zServerResponse>;
