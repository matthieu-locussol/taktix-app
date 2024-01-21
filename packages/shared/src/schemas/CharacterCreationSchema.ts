import { z } from 'zod';

export const zCharacterCreationSchema = z.object({
   name: z.string(),
   username: z.string(),
});

export type CharacterCreationSchema = z.infer<typeof zCharacterCreationSchema>;
