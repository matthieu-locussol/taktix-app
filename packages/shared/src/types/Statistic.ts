import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

const makeStatistic = <T extends string>(
   name: T,
): `${T}_${'+f' | '+%' | '+x%' | '-f' | '-%' | '-x%'}`[] =>
   [`${name}_+f`, `${name}_+%`, `${name}_+x%`, `${name}_-f`, `${name}_-%`, `${name}_-x%`] as const;

export const statistics = [
   // Base statistics
   ...makeStatistic('vitality'),
   ...makeStatistic('magicShield'),
   ...makeStatistic('strength'),
   ...makeStatistic('dexterity'),
   ...makeStatistic('intelligence'),
   ...makeStatistic('luck'),
   ...makeStatistic('allAttributes'),

   // Damages
   ...makeStatistic('earthDamages'),
   ...makeStatistic('windDamages'),
   ...makeStatistic('fireDamages'),
   ...makeStatistic('iceDamages'),
   ...makeStatistic('elementalDamages'),
   ...makeStatistic('sword1HDamages'),
   ...makeStatistic('axe1HDamages'),
   ...makeStatistic('mace1HDamages'),
   ...makeStatistic('daggerDamages'),
   ...makeStatistic('wandDamages'),
   ...makeStatistic('sword2HDamages'),
   ...makeStatistic('axe2HDamages'),
   ...makeStatistic('mace2HDamages'),
   ...makeStatistic('bowDamages'),
   ...makeStatistic('staffDamages'),

   // Criticals
   'criticalStrikeChance_+f',
   'criticalStrikeChance_-f',
   'criticalStrikeChance_+%',
   'criticalStrikeChance_-%',
   'criticalStrikeDamages_+%',
   'criticalStrikeDamages_-%',

   // Life steal
   'lifeSteal_+f',
   'lifeSteal_-f',
   'lifeSteal_+%',
   'lifeSteal_-%',

   // Thorns
   'thornsPhysical_+%',
   'thornsPhysical_-%',
   'thornsMagical_+%',
   'thornsMagical_-%',

   // AoE
   'areaOfEffect_+%',
   'areaOfEffect_-%',

   // Precision
   'precision_+f',
   'precision_-f',
   'precision_+%',
   'precision_-%',

   // Defences
   'earthResistance_+f',
   'earthResistance_+%',
   'earthResistance_-f',
   'earthResistance_-%',
   'windResistance_+f',
   'windResistance_+%',
   'windResistance_-f',
   'windResistance_-%',
   'fireResistance_+f',
   'fireResistance_+%',
   'fireResistance_-f',
   'fireResistance_-%',
   'iceResistance_+f',
   'iceResistance_+%',
   'iceResistance_-f',
   'iceResistance_-%',
   'elementalResistances_+f',
   'elementalResistances_+%',
   'elementalResistances_-f',
   'elementalResistances_-%',

   // Criticals resistance
   'criticalStrikeResistance_+f',
   'criticalStrikeResistance_-f',
   'criticalStrikeResistance_+%',
   'criticalStrikeResistance_-%',

   // Evasion
   'evasion_+f',
   'evasion_-f',
   'evasion_+%',
   'evasion_-%',

   // Miscellaneous
   'prospect_+f',
   'prospect_-f',
   'initiative_+f',
   'initiative_-f',
] as const;

export const zStatistic = ZodMgt.constructZodLiteralUnionType(
   statistics.map((statistic) => z.literal(statistic)),
);

export type Statistic = z.infer<typeof zStatistic>;

export const isStatistic = (value: unknown): value is Statistic =>
   zStatistic.safeParse(value).success;

export type Statistics = Record<Statistic, number>;
