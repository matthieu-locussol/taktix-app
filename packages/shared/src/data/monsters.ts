import type { MonsterType } from '../types/Monster';
import type { PvEFighterInformations } from '../types/PvEFight';
import type { WeaponDamages } from '../types/Weapon';
import type { MonsterSprite } from './monstersSprites';
import type { TranslationKey } from './translations';

import { Animation } from '../types/Animation';
import { zMonsterType } from '../types/Monster';
import { MonsterMgt } from '../utils/monsterMgt';
import { StatisticMgt } from '../utils/statisticMgt';

type FilterEnemy<T> = T extends `enemy-${infer EnemyName}` ? `enemy-${EnemyName}` : never;
export type MonsterName = FilterEnemy<TranslationKey>;
type MonsterGenerator = (parameters: { level: number }) => Monster;

export interface Monster extends PvEFighterInformations {
   name: MonsterName;
   spritesheet: MonsterSprite;
   type: MonsterType;
   animation: Animation;
   money: { min: number; max: number };
}

export const isMonsterName = (value: unknown): value is MonsterName =>
   typeof value === 'string' && value.startsWith('enemy-');

const MONSTER_TYPE_WEIGHTS: Record<Exclude<MonsterType, 'boss'>, number> = {
   common: 125,
   magic: 30,
   rare: 10,
};

const DEFAULT_MONSTER_TYPE: MonsterType = 'common';

const MONSTER_TYPE_PROBABILITIES: Record<MonsterType, number> = Object.keys(
   MONSTER_TYPE_WEIGHTS,
).reduce(
   (acc, typeStr) => {
      const type = zMonsterType.parse(typeStr);
      const weight = type === 'boss' ? 0 : MONSTER_TYPE_WEIGHTS[type];
      const totalWeight = Object.values(MONSTER_TYPE_WEIGHTS).reduce(
         (acc, weight) => acc + weight,
         0,
      );
      const probability = weight / totalWeight;

      return { ...acc, [type]: probability };
   },
   {} as Record<MonsterType, number>,
);

const generateMonsterType = (): Exclude<MonsterType, 'boss'> => {
   const random = Math.random();
   let accumulatedProbability = 0;

   for (const type of Object.keys(MONSTER_TYPE_PROBABILITIES) as MonsterType[]) {
      accumulatedProbability += MONSTER_TYPE_PROBABILITIES[type];

      if (random < accumulatedProbability) {
         return type === 'boss' ? DEFAULT_MONSTER_TYPE : type;
      }
   }

   return DEFAULT_MONSTER_TYPE;
};

export const withMonsterType = (
   availableMonsterTypes: Exclude<MonsterType, 'boss'>[],
   monsterGeneratorFn: (type: Exclude<MonsterType, 'boss'>) => MonsterGenerator,
): MonsterGenerator => {
   if (availableMonsterTypes.length === 0) {
      availableMonsterTypes.push('common');
      availableMonsterTypes.push('magic');
      availableMonsterTypes.push('rare');
   }

   const type = generateMonsterType();
   const constrainedType = availableMonsterTypes.includes(type) ? type : availableMonsterTypes[0];

   return monsterGeneratorFn(constrainedType);
};

const monstersArray: (() => MonsterGenerator)[] = [
   () =>
      withMonsterType([], (type) => ({ level }) => ({
         name: 'enemy-green-slime',
         spritesheet: 'Enemy_001',
         type,
         items: [],
         monsterType: type,
         animation: Animation.Flower,
         health: {
            common: MonsterMgt.scaleMonsterLife(level, 3),
            magic: MonsterMgt.scaleMonsterLife(level, 6),
            rare: MonsterMgt.scaleMonsterLife(level, 8),
         }[type],
         magicShield: 0,
         level,
         experience: MonsterMgt.scaleMonsterExperience(level, type),
         weaponDamages: (
            {
               common: [
                  {
                     weaponType: 'axe1H',
                     type: 'dexterity',
                     min: 1 + Math.floor(level / 2),
                     max: 3 + level,
                  },
               ],
               magic: [
                  {
                     weaponType: 'axe1H',
                     type: 'dexterity',
                     min: 3 + Math.floor(level / 2),
                     max: 5 + level,
                  },
               ],
               rare: [
                  {
                     weaponType: 'axe1H',
                     type: 'dexterity',
                     min: 3 + level,
                     max: 5 + level * 2,
                  },
               ],
            } as Record<MonsterType, WeaponDamages[]>
         )[type],
         rawStatistics: StatisticMgt.serializeStatistics(
            StatisticMgt.makeMockedStatistics({
               'strength_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'dexterity_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'intelligence_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'luck_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'precision_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'evasion_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'criticalStrikeChance_+f': 5,
               'criticalStrikeDamages_+%': 10,
            }),
         ),
         talents: [],
         uniquesPowers: [],
         money: { min: 30, max: 70 },
      })),
   () =>
      withMonsterType([], (type) => ({ level }) => ({
         name: 'enemy-red-slime',
         spritesheet: 'Enemy_002',
         type,
         items: [],
         monsterType: type,
         animation: Animation.Flower,
         health: {
            common: MonsterMgt.scaleMonsterLife(level, 4),
            magic: MonsterMgt.scaleMonsterLife(level, 8),
            rare: MonsterMgt.scaleMonsterLife(level, 10),
         }[type],
         magicShield:
            MonsterMgt.scaleMonsterStatistic(
               level,
               MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
            ) / 2,
         level,
         experience: MonsterMgt.scaleMonsterExperience(level, type),
         weaponDamages: (
            {
               common: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 2 + Math.floor(level / 2),
                     max: 3 + level,
                  },
               ],
               magic: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 3 + Math.floor(level / 2),
                     max: 6 + level,
                  },
               ],
               rare: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 3 + level,
                     max: 6 + level * 2,
                  },
               ],
            } as Record<MonsterType, WeaponDamages[]>
         )[type],
         rawStatistics: StatisticMgt.serializeStatistics(
            StatisticMgt.makeMockedStatistics({
               'strength_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'dexterity_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'intelligence_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'luck_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'precision_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'evasion_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'criticalStrikeChance_+f': 5,
               'criticalStrikeDamages_+%': 30,
            }),
         ),
         talents: [],
         uniquesPowers: [],
         money: { min: 30, max: 70 },
      })),
   () =>
      withMonsterType([], (type) => ({ level }) => ({
         name: 'enemy-blue-slime',
         spritesheet: 'Enemy_003',
         type,
         items: [],
         monsterType: type,
         animation: Animation.Flower,
         health: {
            common: MonsterMgt.scaleMonsterLife(level, 4),
            magic: MonsterMgt.scaleMonsterLife(level, 8),
            rare: MonsterMgt.scaleMonsterLife(level, 10),
         }[type],
         magicShield:
            MonsterMgt.scaleMonsterStatistic(
               level,
               MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
            ) / 2,
         level,
         experience: MonsterMgt.scaleMonsterExperience(level, type),
         weaponDamages: (
            {
               common: [
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 2 + Math.floor(level / 2),
                     max: 3 + level,
                  },
               ],
               magic: [
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 3 + Math.floor(level / 2),
                     max: 6 + level,
                  },
               ],
               rare: [
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 3 + level,
                     max: 6 + level * 2,
                  },
               ],
            } as Record<MonsterType, WeaponDamages[]>
         )[type],
         rawStatistics: StatisticMgt.serializeStatistics(
            StatisticMgt.makeMockedStatistics({
               'strength_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'dexterity_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'intelligence_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'luck_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'precision_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'evasion_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'criticalStrikeChance_+f': 5,
               'criticalStrikeDamages_+%': 30,
            }),
         ),
         talents: [],
         uniquesPowers: [],
         money: { min: 30, max: 70 },
      })),
   () =>
      withMonsterType([], (type) => ({ level }) => ({
         name: 'enemy-pink-slime',
         spritesheet: 'Enemy_004',
         type,
         items: [],
         monsterType: type,
         animation: Animation.Flower,
         health: {
            common: MonsterMgt.scaleMonsterLife(level, 6),
            magic: MonsterMgt.scaleMonsterLife(level, 10),
            rare: MonsterMgt.scaleMonsterLife(level, 14),
         }[type],
         magicShield: MonsterMgt.scaleMonsterStatistic(
            level,
            MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type] / 2,
         ),
         level,
         experience: MonsterMgt.scaleMonsterExperience(level, type),
         weaponDamages: (
            {
               common: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 2 + Math.floor(level / 2),
                     max: 3 + level,
                  },
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 2 + Math.floor(level / 2),
                     max: 3 + level,
                  },
               ],
               magic: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 3 + Math.floor(level / 2),
                     max: 5 + level,
                  },
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 3 + Math.floor(level / 2),
                     max: 5 + level,
                  },
               ],
               rare: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 3 + level,
                     max: 5 + level * 2,
                  },
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 3 + level,
                     max: 5 + level * 2,
                  },
               ],
            } as Record<MonsterType, WeaponDamages[]>
         )[type],
         rawStatistics: StatisticMgt.serializeStatistics(
            StatisticMgt.makeMockedStatistics({
               'strength_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'dexterity_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'intelligence_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'luck_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'precision_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'evasion_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'criticalStrikeChance_+f': 10,
               'criticalStrikeDamages_+%': 30,
            }),
         ),
         talents: [],
         uniquesPowers: [],
         money: { min: 30, max: 70 },
      })),
   () =>
      withMonsterType([], (type) => ({ level }) => ({
         name: 'enemy-eyeboros',
         spritesheet: 'Enemy_051',
         type,
         items: [],
         monsterType: type,
         animation: Animation.Explosion,
         health: {
            common: 10 + MonsterMgt.scaleMonsterLife(level, 8),
            magic: 15 + MonsterMgt.scaleMonsterLife(level, 12),
            rare: 20 + MonsterMgt.scaleMonsterLife(level, 15),
         }[type],
         magicShield: MonsterMgt.scaleMonsterStatistic(
            level,
            MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type] / 2,
         ),
         level,
         experience: MonsterMgt.scaleMonsterExperience(level, type),
         weaponDamages: (
            {
               common: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 4 + Math.floor(level / 2),
                     max: 7 + level,
                  },
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 2 + Math.floor(level / 2),
                     max: 9 + level,
                  },
               ],
               magic: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 4 + Math.floor(level / 2),
                     max: 7 + level,
                  },
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 2 + Math.floor(level / 2),
                     max: 9 + level,
                  },
               ],
               rare: [
                  {
                     weaponType: 'axe1H',
                     type: 'intelligence',
                     min: 4 + level,
                     max: 7 + level * 2,
                  },
                  {
                     weaponType: 'axe1H',
                     type: 'luck',
                     min: 2 + level,
                     max: 9 + level * 2,
                  },
               ],
            } as Record<MonsterType, WeaponDamages[]>
         )[type],
         rawStatistics: StatisticMgt.serializeStatistics(
            StatisticMgt.makeMockedStatistics({
               'strength_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'dexterity_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'intelligence_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'luck_+f': MonsterMgt.scaleMonsterStatistic(
                  level,
                  MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
               ),
               'precision_+f':
                  2 *
                  MonsterMgt.scaleMonsterStatistic(
                     level,
                     MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                  ),
               'evasion_+f':
                  15 +
                  2 *
                     MonsterMgt.scaleMonsterStatistic(
                        level,
                        MonsterMgt.MONSTER_TYPE_STATS_COEFFICIENTS[type],
                     ),
               'criticalStrikeChance_+f': 10,
               'criticalStrikeDamages_+%': 30,
               'windResistance_+%': 15,
               'fireResistance_-%': 10,
            }),
         ),
         talents: [],
         uniquesPowers: [],
         money: { min: 50, max: 100 },
      })),
] as const;

export const monsters = monstersArray.reduce<Record<MonsterName, () => MonsterGenerator>>(
   (acc, monster) => ({
      ...acc,
      [monster()({ level: 1 }).name]: monster,
   }),
   {} as Record<MonsterName, () => MonsterGenerator>,
);
