import { z } from 'zod';
import { zHelloSchema } from './schemas/HelloSchema';
import { zMessageSchema } from './schemas/MessageSchema';
import { zSumSchema } from './schemas/SumSchema';

export const zSocketSchema = z.discriminatedUnion('type', [
   zHelloSchema,
   zMessageSchema,
   zSumSchema,
]);

export type SocketSchema = z.infer<typeof zSocketSchema>;
