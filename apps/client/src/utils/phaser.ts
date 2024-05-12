import { z } from 'zod';

export enum EntityType {
   Character = 'Character',
   NPC = 'NPC',
   Monster = 'Monster',
}

export const zEntityType = z.nativeEnum(EntityType);

export const zObjectProperties = z.array(
   z.object({
      name: z.string(),
      value: z.string(),
   }),
);

export type ObjectProperties = z.infer<typeof zObjectProperties>;

export const isObjectProperties = (value: unknown): value is ObjectProperties =>
   zObjectProperties.safeParse(value).success;
