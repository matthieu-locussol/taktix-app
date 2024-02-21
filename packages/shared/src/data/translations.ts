import { z } from 'zod';
import { Language } from '../types/Language';
import { ZodMgt } from '../utils/zodMgt';
import { translationsEn } from './translations/en';
import { translationsFr } from './translations/fr';
import { translationsJa } from './translations/ja';

export type LanguageTranslations = Record<TranslationKey, string>;

export const translationKeys = Object.keys(translationsEn) as (keyof typeof translationsEn)[];

export const zTranslationKey = ZodMgt.constructZodLiteralUnionType(
   translationKeys.map((key) => z.literal(key)),
);

export type TranslationKey = z.infer<typeof zTranslationKey>;

export const translations: Record<Language, { translation: LanguageTranslations }> = {
   en: { translation: translationsEn },
   fr: { translation: translationsFr },
   ja: { translation: translationsJa },
};

export const LANGUAGES_NAMES: Record<Language, string> = {
   en: '🇬🇧 English',
   fr: '🇫🇷 Français',
   ja: '🇯🇵 日本語',
};

export const DEFAULT_LANGUAGE: Language = 'en';
