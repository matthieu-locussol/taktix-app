import { z } from 'zod';
import { zPingMessage } from './schemas/PingMessage';

export const zServerMessage = z.discriminatedUnion('type', [zPingMessage]);

export type ServerMessage = z.infer<typeof zServerMessage>;
