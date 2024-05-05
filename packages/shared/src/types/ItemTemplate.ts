import { z } from 'zod';
import { Statistic } from './Statistic';

const zAffixTemplate = z.object({
   name: z.string(),
   level: z.number(),
   min: z.number(),
   max: z.number(),
});

type AffixTemplate = z.infer<typeof zAffixTemplate>;

export type ItemTemplate = Record<
   'prefixes' | 'suffixes',
   Partial<Record<Statistic, AffixTemplate[]>>
>;
