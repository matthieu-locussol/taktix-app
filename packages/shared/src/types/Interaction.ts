import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

export const interactions = ['Sleep', 'SaveTeleporter', 'DrinkWine'] as const;

export const zInteraction = ZodMgt.constructZodLiteralUnionType(
   interactions.map((interaction) => z.literal(interaction)),
);

export type Interaction = z.infer<typeof zInteraction>;
