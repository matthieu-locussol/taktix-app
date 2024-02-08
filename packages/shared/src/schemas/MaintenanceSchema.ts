import { z } from 'zod';

export const zMaintenanceSchema = z.object({
   type: z.union([z.literal('start'), z.literal('end')]),
   token: z.string(),
});
