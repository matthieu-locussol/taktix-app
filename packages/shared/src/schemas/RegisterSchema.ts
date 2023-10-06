import { z } from 'zod';

export const zRegisterSchema = z.object({
   email: z.string(),
   username: z.string(),
   password: z.string(),
});

export type RegisterSchema = z.infer<typeof zRegisterSchema>;
