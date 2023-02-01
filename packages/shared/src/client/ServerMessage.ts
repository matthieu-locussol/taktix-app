import { z } from 'zod';
import { zPingSchema } from './schemas/PingSchema';

export const zServerMessage = z.discriminatedUnion('type', [zPingSchema]);

export type ServerMessage = z.infer<typeof zServerMessage>;
