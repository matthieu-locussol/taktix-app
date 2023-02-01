import { z } from 'zod';
import { zPingResponseSchema } from './schemas/PingResponseSchema';

export const zClientResponse = z.discriminatedUnion('type', [zPingResponseSchema]);

export type ClientResponse = z.infer<typeof zClientResponse>;
