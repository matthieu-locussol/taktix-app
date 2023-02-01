import { z } from 'zod';
import { zPingResponse } from './schemas/responses/PingResponse';

export const zClientResponse = z.discriminatedUnion('type', [zPingResponse]);

export type ClientResponse = z.infer<typeof zClientResponse>;
