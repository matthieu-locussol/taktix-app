import type { TranslationKey } from 'shared/src/data/translations.ts';

import { useCallback } from 'react';
import { useTranslation as useTranslationOriginal } from 'react-i18next';

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: TranslationKey, options: unknown) => t(key as any, options as any) as any,
      [t],
   );

   return { t: customTFunction };
};
