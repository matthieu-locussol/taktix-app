import { Animation } from '../types/Animation';
import { MonsterType, zMonsterType } from '../types/Monster';
import { PvEFighterInformations } from '../types/PvEFight';
import { WeaponDamages } from '../types/Weapon';
import { StatisticMgt } from '../utils/statisticMgt';
import { TranslationKey } from './translations';

type FilterEnemy<T> = T extends `enemy-${infer EnemyName}` ? `enemy-${EnemyName}` : never;
export type MonsterName = FilterEnemy<TranslationKey>;
type MonsterGenerator = (parameters: { level: number }) => Monster;

export interface Monster extends PvEFighterInformations {
   name: MonsterName;
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
         name: 'enemy-nono',
         type,
         monsterType: type,
         animation: Animation.Flower,
         health: {
            common: 20 + level * 15,
            magic: 30 + level * 20,
            rare: 40 + level * 25,
         }[type],
         magicShield: {
            common: 30 + level * 5,
            magic: 50 + level * 10,
            rare: 70 + level * 15,
         }[type],
         level,
         experience: {
            common: 10 + level * 5,
            magic: 15 + level * 7,
            rare: 20 + level * 10,
         }[type],
         weaponType: 'axe1H',
         weaponDamages: (
            {
               common: [{ type: 'strength', min: level, max: level * 3 }],
               magic: [
                  { type: 'strength', min: level * 2, max: level * 5 },
                  { type: 'intelligence', min: level, max: level * 3 },
               ],
               rare: [
                  { type: 'strength', min: level * 3, max: level * 6 },
                  { type: 'luck', min: level * 2, max: level * 4 },
               ],
            } as Record<MonsterType, WeaponDamages[]>
         )[type],
         rawStatistics: StatisticMgt.serializeStatistics(
            StatisticMgt.makeMockedStatistics({
               'strength_+f': {
                  common: level * 8,
                  magic: level * 10,
                  rare: level * 12,
               }[type],
               'precision_+f': {
                  common: level * 5,
                  magic: level * 6,
                  rare: level * 7,
               }[type],
               'evasion_+f': {
                  common: 35 + level * 2,
                  magic: 35 + level * 3,
                  rare: 35 + level * 4,
               }[type],
               'criticalStrikeDamages_+%': 30,
            }),
         ),
         talents: [],
         uniquesPowers: [],
         money: {
            min: {
               common: 20,
               magic: 25,
               rare: 40,
            }[type],
            max: {
               common: 60,
               magic: 70,
               rare: 100,
            }[type],
         },
      })),
] as const;

export const monsters = monstersArray.reduce<Record<MonsterName, () => MonsterGenerator>>(
   (acc, monster) => ({
      ...acc,
      [monster()({ level: 1 }).name]: monster,
   }),
   {} as Record<MonsterName, () => MonsterGenerator>,
);
