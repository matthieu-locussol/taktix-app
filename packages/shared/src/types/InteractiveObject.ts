import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

export const interactiveObjectsKeys = ['Teleporter', 'TeleporterCell', 'Bed', 'Well'] as const;

export const zInteractiveObject = ZodMgt.constructZodLiteralUnionType(
   interactiveObjectsKeys.map((value) => z.literal(value)),
);

export type InteractiveObject = z.infer<typeof zInteractiveObject>;

export const isInteractiveObject = (value: unknown): value is InteractiveObject =>
   zInteractiveObject.safeParse(value).success;

export interface InteractiveObjectData {
   id: InteractiveObject;
   x: number | null;
   y: number | null;
}
