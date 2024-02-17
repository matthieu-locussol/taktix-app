import { z } from 'zod';

export const zChangelogSchema = z.object({
   changelogs: z.array(
      z.object({
         id: z.string(),
         date: z.string(),
         text: z.string(),
      }),
   ),
});

export type ChangelogSchema = z.infer<typeof zChangelogSchema>;
