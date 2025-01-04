import type { Statistic } from './Statistic';

import { z } from 'zod';

const zAffixTemplate = z.object({
   name: z.string(),
   level: z.number(),
   min: z.number(),
   max: z.number(),
});

export type AffixTemplate = z.infer<typeof zAffixTemplate>;

export type ItemTemplate = Record<
   'prefixes' | 'suffixes',
   Partial<Record<Statistic, AffixTemplate[]>>
>;

export type BaseTemplate = Partial<Record<Statistic, AffixTemplate>>;
