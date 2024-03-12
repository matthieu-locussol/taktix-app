import { z } from 'zod';
import { Language } from '../types/Language';
import { ZodMgt } from '../utils/zodMgt';
import { translationsEn } from './translations/en';
import { translationsFr } from './translations/fr';
import { translationsJa } from './translations/ja';

type BaseKey<T extends string> = T extends `${infer Base}_${'one' | 'other'}` ? Base : never;
export type TranslationKey = TranslationKeyInternal | BaseKey<TranslationKeyInternal>;

export type LanguageTranslations = Record<TranslationKeyInternal, string>;

export const translationKeys = Object.keys(translationsEn) as (keyof typeof translationsEn)[];

export const zTranslationKey = ZodMgt.constructZodLiteralUnionType(
   translationKeys.map((key) => z.literal(key)),
);

type TranslationKeyInternal = z.infer<typeof zTranslationKey>;

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
