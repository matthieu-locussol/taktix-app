import { Animation } from '../types/Animation';
import { MonsterType, zMonsterType } from '../types/Monster';
import { PvEFighterInformations } from '../types/PvEFight';
import { WeaponDamages } from '../types/Weapon';
import { MonsterMgt } from '../utils/monsterMgt';
import { StatisticMgt } from '../utils/statisticMgt';
import { MonsterSprite } from './monstersSprites';
import { TranslationKey } from './translations';

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
            common: MonsterMgt.scaleMonsterLife(level, 2),
            magic: MonsterMgt.scaleMonsterLife(level, 3),
            rare: MonsterMgt.scaleMonsterLife(level, 4),
         }[type],
         magicShield: 0,
         level,
         experience: MonsterMgt.scaleMonsterExperience(level, type),
         weaponDamages: (
            {
               common: [
                  {
                     weaponType: 'axe1H',
                     type: 'strength',
                     min: 1 + Math.floor(level / 2),
                     max: 3 + level,
                  },
               ],
               magic: [
                  {
                     weaponType: 'axe1H',
                     type: 'strength',
                     min: 3 + Math.floor(level / 2),
                     max: 5 + level,
                  },
               ],
               rare: [
                  {
                     weaponType: 'axe1H',
                     type: 'strength',
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
            common: MonsterMgt.scaleMonsterLife(level, 2),
            magic: MonsterMgt.scaleMonsterLife(level, 3),
            rare: MonsterMgt.scaleMonsterLife(level, 4),
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
            common: MonsterMgt.scaleMonsterLife(level, 2),
            magic: MonsterMgt.scaleMonsterLife(level, 3),
            rare: MonsterMgt.scaleMonsterLife(level, 4),
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
            common: MonsterMgt.scaleMonsterLife(level, 2),
            magic: MonsterMgt.scaleMonsterLife(level, 3),
            rare: MonsterMgt.scaleMonsterLife(level, 4),
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
               'criticalStrikeChance_+f': 5,
               'criticalStrikeDamages_+%': 30,
            }),
         ),
         talents: [],
         uniquesPowers: [],
         money: { min: 30, max: 70 },
      })),
] as const;

export const monsters = monstersArray.reduce<Record<MonsterName, () => MonsterGenerator>>(
   (acc, monster) => ({
      ...acc,
      [monster()({ level: 1 }).name]: monster,
   }),
   {} as Record<MonsterName, () => MonsterGenerator>,
);
