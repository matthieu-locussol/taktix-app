import { useCallback } from 'react';
import { useTranslation as useTranslationOriginal } from 'react-i18next';
import { TranslationKey } from 'shared/src/data/translations';

declare module 'i18next' {
   interface TFunction {
      (key: TranslationKey, options?: unknown): string;
   }
}

export type TFunctionWrapper = (key: TranslationKey, options?: unknown) => string;

type UseTranslationResponse = {
   t: TFunctionWrapper;
};

export const useTranslation = (): UseTranslationResponse => {
   const { t } = useTranslationOriginal();

   const customTFunction = useCallback(
      (key: TranslationKey, options: unknown) => t(key as any, options as any) as any,
      [t],
   );
   return { t: customTFunction };
};
