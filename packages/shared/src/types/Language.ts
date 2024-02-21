import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

export const languages = ['en', 'fr', 'ja'] as const;

export const zLanguage = ZodMgt.constructZodLiteralUnionType(
   languages.map((lang) => z.literal(lang)),
);

export type Language = z.infer<typeof zLanguage>;

export const isLanguage = (value: unknown): value is Language => zLanguage.safeParse(value).success;
