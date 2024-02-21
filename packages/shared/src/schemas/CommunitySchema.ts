import { z } from 'zod';

export const zCommunitySchema = z.object({
   players: z.array(
      z.object({
         avatar: z.string(),
         player: z.string(),
         level: z.number(),
         profession: z.string(),
      }),
   ),
});

export type CommunitySchema = z.infer<typeof zCommunitySchema>;
