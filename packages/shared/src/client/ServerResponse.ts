import { z } from 'zod';
import { zHelloResponseSchema } from './schemas/HelloResponseSchema';
import { zMessageResponseSchema } from './schemas/MessageResponseSchema';
import { zSumResponseSchema } from './schemas/SumResponseSchema';

export const zServerResponse = z.discriminatedUnion('type', [
   zHelloResponseSchema,
   zMessageResponseSchema,
   zSumResponseSchema,
]);

export type ServerResponse = z.infer<typeof zServerResponse>;
