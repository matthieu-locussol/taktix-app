import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';
import { zStatistic } from './Statistic';
import { weapons } from './Weapon';

export const itemsTypes = [
   'helmetE',
   'helmetH',
   'helmetM',
   'helmetEH',
   'helmetEM',
   'helmetHM',
   'chestplateE',
   'chestplateH',
   'chestplateM',
   'chestplateEH',
   'chestplateEM',
   'chestplateHM',
   'bootsE',
   'bootsH',
   'bootsM',
   'bootsEH',
   'bootsEM',
   'bootsHM',
   'glovesE',
   'glovesH',
   'glovesM',
   'glovesEH',
   'glovesEM',
   'glovesHM',
   'belt',
   'amulet',
   'ring',
   'shield',
   'quiver',
   'orb',
   'relic',
   ...weapons,
] as const;

export const zItemType = ZodMgt.constructZodLiteralUnionType(
   itemsTypes.map((type) => z.literal(type)),
);

export type ItemType = z.infer<typeof zItemType>;

export const isItemType = (value: unknown): value is ItemType => zItemType.safeParse(value).success;

export const rarities = ['common', 'uncommon', 'rare', 'epic', 'unique'] as const;

export const zItemRarity = ZodMgt.constructZodLiteralUnionType(
   rarities.map((rarity) => z.literal(rarity)),
);

export type ItemRarity = z.infer<typeof zItemRarity>;

export const isItemRarity = (value: unknown): value is ItemRarity =>
   zItemRarity.safeParse(value).success;

export const zAffix = z.object({
   name: z.string(),
   tier: z.number(),
   statistics: z.record(zStatistic, z.number()),
});

export type Affix = z.infer<typeof zAffix>;

export const zItem = z.object({
   id: z.number(),
   isUnique: z.boolean(),
   type: zItemType,
   level: z.number(),
   requiredLevel: z.number(),
   prefixes: z.array(zAffix),
   suffixes: z.array(zAffix),
});

export type Item = z.infer<typeof zItem>;

export const isItem = (value: unknown): value is Item => zItem.safeParse(value).success;
