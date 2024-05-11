import { z } from 'zod';

export enum Interaction {
   Sleep = 1,
}

export const zInteraction = z.nativeEnum(Interaction);
