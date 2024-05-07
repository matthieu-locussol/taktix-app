import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';
import { zStatistic } from './Statistic';
import { weapons } from './Weapon';

export const helmetTypes = [
   'helmetE',
   'helmetH',
   'helmetM',
   'helmetEH',
   'helmetEM',
   'helmetHM',
] as const;

const zHelmetType = ZodMgt.constructZodLiteralUnionType(helmetTypes.map((type) => z.literal(type)));

export type HelmetType = z.infer<typeof zHelmetType>;

export const isHelmetType = (value: unknown): value is HelmetType =>
   zHelmetType.safeParse(value).success;

export const chestplateTypes = [
   'chestplateE',
   'chestplateH',
   'chestplateM',
   'chestplateEH',
   'chestplateEM',
   'chestplateHM',
] as const;

export const zChestplateType = ZodMgt.constructZodLiteralUnionType(
   chestplateTypes.map((type) => z.literal(type)),
);

export type ChestplateType = z.infer<typeof zChestplateType>;

export const isChestplateType = (value: unknown): value is ChestplateType =>
   zChestplateType.safeParse(value).success;

export const bootsTypes = ['bootsE', 'bootsH', 'bootsM', 'bootsEH', 'bootsEM', 'bootsHM'] as const;

export const zBootsType = ZodMgt.constructZodLiteralUnionType(
   bootsTypes.map((type) => z.literal(type)),
);

export type BootsType = z.infer<typeof zBootsType>;

export const isBootsType = (value: unknown): value is BootsType =>
   zBootsType.safeParse(value).success;

export const glovesTypes = [
   'glovesE',
   'glovesH',
   'glovesM',
   'glovesEH',
   'glovesEM',
   'glovesHM',
] as const;

export const zGlovesType = ZodMgt.constructZodLiteralUnionType(
   glovesTypes.map((type) => z.literal(type)),
);

export type GlovesType = z.infer<typeof zGlovesType>;

export const isGlovesType = (value: unknown): value is GlovesType =>
   zGlovesType.safeParse(value).success;

export const offhandTypes = ['shield', 'quiver', 'orb'] as const;

export const zOffhandType = ZodMgt.constructZodLiteralUnionType(
   offhandTypes.map((type) => z.literal(type)),
);

export type OffhandType = z.infer<typeof zOffhandType>;

export const isOffhandType = (value: unknown): value is OffhandType =>
   zOffhandType.safeParse(value).success;

export const itemsTypes = [
   ...helmetTypes,
   ...chestplateTypes,
   ...bootsTypes,
   ...glovesTypes,
   'belt',
   'amulet',
   'ring',
   ...offhandTypes,
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

export enum ItemPosition {
   Inventory = 0,
   Equipment = 1,
   Bank = 2,
}

export const zItemPosition = z.nativeEnum(ItemPosition);

export const isItemPosition = (value: unknown): value is ItemPosition =>
   zItemPosition.safeParse(value).success;

export const zItem = z.object({
   id: z.number(),
   isUnique: z.boolean(),
   type: zItemType,
   level: z.number(),
   requiredLevel: z.number(),
   prefixes: z.array(zAffix),
   suffixes: z.array(zAffix),
   position: zItemPosition,
});

export type Item = z.infer<typeof zItem>;

export const isItem = (value: unknown): value is Item => zItem.safeParse(value).success;
