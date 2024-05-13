import { Animation } from '../types/Animation';
import { MonsterType, zMonsterType } from '../types/Monster';
import { PvEFighterInformations } from '../types/PvEFight';
import { WeaponDamages } from '../types/Weapon';
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
         name: 'enemy-nono',
         spritesheet: 'Enemy_001',
         type,
         items: [],
         monsterType: type,
         animation: Animation.Flower,
         health: {
            common: 10 + level * 10,
            magic: 20 + level * 15,
            rare: 30 + level * 20,
         }[type],
         magicShield: {
            common: 20 + level * 5,
            magic: 30 + level * 10,
            rare: 40 + level * 15,
         }[type],
         level,
         experience: {
            common: 20 + level * 5,
            magic: 30 + level * 7,
            rare: 50 + level * 10,
         }[type],
         weaponDamages: (
            {
               common: [{ weaponType: 'axe1H', type: 'strength', min: level, max: level * 3 }],
               magic: [
                  { weaponType: 'axe1H', type: 'strength', min: level, max: level * 2 },
                  { weaponType: 'axe1H', type: 'intelligence', min: level, max: level * 3 },
               ],
               rare: [
                  { weaponType: 'axe1H', type: 'strength', min: level * 2, max: level * 3 },
                  { weaponType: 'axe1H', type: 'luck', min: level * 2, max: level * 2 },
               ],
            } as Record<MonsterType, WeaponDamages[]>
         )[type],
         rawStatistics: StatisticMgt.serializeStatistics(
            StatisticMgt.makeMockedStatistics({
               'strength_+f': {
                  common: level * 8,
                  magic: level * 9,
                  rare: level * 10,
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
