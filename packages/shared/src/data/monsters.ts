import { Animation } from '../types/Animation';
import { PvEFighterInformations } from '../types/PvEFight';
import { WeaponType } from '../types/Weapon';
import { StatisticMgt } from '../utils/statisticMgt';
import { TranslationKey } from './translations';

type FilterEnemy<T> = T extends `enemy-${infer EnemyName}` ? `enemy-${EnemyName}` : never;
type MonsterName = FilterEnemy<TranslationKey>;
type MonsterGenerator = (parameters: {
   level: number;
}) => PvEFighterInformations & { name: MonsterName; animation: Animation };

export const isMonsterName = (value: unknown): value is MonsterName =>
   typeof value === 'string' && value.startsWith('enemy-');

const monstersArray: MonsterGenerator[] = [
   ({ level }) => ({
      name: 'enemy-nono',
      animation: Animation.Flower,
      health: 20 + level * 15,
      magicShield: 30 + level * 5,
      level,
      experience: 130 + level * 25,
      weaponType: WeaponType.Axe1H,
      weaponDamages: [{ type: 'strength', min: level, max: level * 3 }],
      rawStatistics: StatisticMgt.serializeStatistics(
         StatisticMgt.makeMockedStatistics({
            'strength_+f': level * 8,
         }),
      ),
      talents: [],
      uniquesPowers: [],
   }),
] as const;

export const monsters = monstersArray.reduce<Record<MonsterName, MonsterGenerator>>(
   (acc, monster) => ({
      ...acc,
      [monster({ level: 1 }).name]: monster,
   }),
   {} as Record<MonsterName, MonsterGenerator>,
);
