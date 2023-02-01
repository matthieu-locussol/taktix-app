import { z } from 'zod';
import { zPingMessage } from './schemas/messages/PingMessage';

export const zServerMessage = z.discriminatedUnion('type', [zPingMessage]);

export type ServerMessage = z.infer<typeof zServerMessage>;
