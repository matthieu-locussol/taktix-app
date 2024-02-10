import { z } from 'zod';

export const zStatusSchema = z.object({
   status: z.union([z.literal('online'), z.literal('maintenance'), z.literal('offline')]),
});

export type StatusSchema = z.infer<typeof zStatusSchema>;
