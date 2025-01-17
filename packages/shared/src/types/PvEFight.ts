import type { RealStatistic } from './Statistic';

import { z } from 'zod';

import { zCharacterSprite } from '../data/charactersSprites';
import { zMonsterSprite } from '../data/monstersSprites';

import { zItem } from './Item';
import { zMonsterType } from './Monster';
import { zProfessionType } from './Profession';
import { isRealStatistic, zRealStatistic } from './Statistic';
import { zWeaponDamages, zWeaponDamagesType } from './Weapon';

const zPvEFighterInformations = z.object({
   name: z.string(),
   monsterType: zMonsterType.optional(),

   health: z.number(),
   magicShield: z.number(),

   level: z.number(),
   experience: z.number(),
   profession: zProfessionType.optional(),
   spritesheet: z.union([zCharacterSprite, zMonsterSprite]).optional(),

   weaponDamages: z.array(zWeaponDamages),
   rawStatistics: z.string(),

   items: z.array(zItem),
   talents: z.array(z.number()),
   // TODO: items powers from uniques
   uniquesPowers: z.array(z.unknown()),
});

export type PvEFighterInformations = z.infer<typeof zPvEFighterInformations>;

const zPvEFighter = z.object({
   id: z.number(),
   type: z.union([z.literal('ally'), z.literal('monster')]),
   statistics: z
      .record(zRealStatistic, z.number())
      .refine((obj): obj is Record<RealStatistic, number> =>
         Object.keys(obj).every((key) => isRealStatistic(key)),
      ),
   ...zPvEFighterInformations.shape,
});

export type PvEFighter = z.infer<typeof zPvEFighter>;

const zPvEFighterSimplified = z.object({
   id: z.number(),
   type: z.union([z.literal('ally'), z.literal('monster')]),
   health: z.number(),
   magicShield: z.number(),
});

export type PvEFighterSimplified = z.infer<typeof zPvEFighterSimplified>;

const zPvEAllySimplified = z.object({
   id: z.number(),
   name: z.string(),
   type: z.union([z.literal('ally'), z.literal('monster')]),
   health: z.number(),
   magicShield: z.number(),
   level: z.number(),
   experience: z.number(),
   profession: zProfessionType.optional(),
   spritesheet: zCharacterSprite,
   weaponDamages: z.array(zWeaponDamages),
});

export type PvEAllySimplified = z.infer<typeof zPvEAllySimplified>;

const zPvEMonsterSimplified = z.object({
   id: z.number(),
   name: z.string(),
   monsterType: zMonsterType.optional(),
   spritesheet: zMonsterSprite,
   type: z.union([z.literal('ally'), z.literal('monster')]),
   health: z.number(),
   magicShield: z.number(),
   level: z.number(),
});

export type PvEMonsterSimplified = z.infer<typeof zPvEMonsterSimplified>;

const zPvEFightParameters = z.object({
   alliesInformations: z.array(zPvEFighterInformations),
   monstersInformations: z.array(zPvEFighterInformations),
   areaExperienceBonus: z.number(),
   areaLootBonus: z.number(),
});

export type PvEFightParameters = z.infer<typeof zPvEFightParameters>;

const zPvEFightMove = z.object({
   fighterId: z.number(),
   targetId: z.number(),
   damages: z.array(
      z.object({
         type: zWeaponDamagesType,
         value: z.number(),
         isCriticalStrike: z.boolean(),
      }),
   ),
   damagesAoE: z.array(
      z.object({
         type: z.string(),
         value: z.number(),
         targetId: z.number(),
      }),
   ),
   hasDodged: z.boolean(),
   lifeStolen: z.number(),
   magicalThornsDamages: z.number(),
   physicalThornsDamages: z.number(),
});

export type PvEFightMove = z.infer<typeof zPvEFightMove>;

const zPvEFightTurn = z.object({
   fighters: z.array(zPvEFighterSimplified),
   moves: z.array(zPvEFightMove),
});

export type PvEFightTurn = z.infer<typeof zPvEFightTurn>;

const zPvEInitialConditions = z.array(
   z.object({
      fighterId: z.number(),
      health: z.number(),
      magicShield: z.number(),
      maxHealth: z.number(),
      maxMagicShield: z.number(),
   }),
);

export type PvEInitialConditions = z.infer<typeof zPvEInitialConditions>;

export const zPvEFightResults = z.object({
   initialConditions: zPvEInitialConditions,
   allies: z.array(zPvEAllySimplified),
   monsters: z.array(zPvEMonsterSimplified),
   turns: z.array(zPvEFightTurn),
   experiences: z.array(z.number()),
   loots: z.array(z.array(zItem)),
   won: z.boolean(),
});

export type PvEFightResults = z.infer<typeof zPvEFightResults>;
