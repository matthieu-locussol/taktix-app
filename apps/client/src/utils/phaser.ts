import { z } from 'zod';

export enum EntityType {
   Character = 'Character',
}

export const zEntityType = z.nativeEnum(EntityType);

export enum InteractiveObjectType {
   Teleporter = 'Teleporter',
}

export const zInteractiveObjectType = z.nativeEnum(InteractiveObjectType);

export const isInteractiveObjectType = (value: unknown): value is InteractiveObjectType =>
   zInteractiveObjectType.safeParse(value).success;

export const zObjectProperties = z.array(
   z.object({
      name: z.string(),
      value: z.string(),
   }),
);

export type ObjectProperties = z.infer<typeof zObjectProperties>;

export const isObjectProperties = (value: unknown): value is ObjectProperties =>
   zObjectProperties.safeParse(value).success;
