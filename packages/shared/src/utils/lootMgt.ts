import { MAXIMUM_LEVEL } from '../data/levels';
import { Monster, MonsterName } from '../data/monsters';
import { Item, ItemRarity, rarities } from '../types/Item';
import { MonsterType } from '../types/Monster';
import { ArrayMgt } from './arrayMgt';
import { ItemMgt } from './itemMgt';
import { NumberMgt } from './numberMgt';

export namespace LootMgt {
   export const BASE_PROBABILITIES: Record<ItemRarity, number> = {
      common: 0.6,
      uncommon: 0.25,
      rare: 0.1,
      epic: 0.04,
      unique: 0.01,
   };

   export const MONSTER_TYPE_RATE: Record<MonsterType, number> = {
      common: 0.8,
      magic: 1,
      rare: 1.2,
      boss: 1.5,
   };

   export const EXPONENTIAL_RATES: Record<ItemRarity, number> = {
      common: 0.1,
      uncommon: 0.2,
      rare: 0.3,
      epic: 0.5,
      unique: 0.7,
   };

   export const GROWTH_FACTORS: Record<ItemRarity, number> = {
      common: 0.2,
      uncommon: 0.4,
      rare: 0.3,
      epic: 0.2,
      unique: 0.1,
   };

   export const MONSTER_TYPE_ITEM_LEVEL_BONUS: Record<MonsterType, number> = {
      common: 0,
      magic: 1,
      rare: 2,
      boss: 3,
   };

   export const computeMoneyEarned = (monsters: Monster[]): number => {
      return monsters.reduce(
         (acc, monster) => acc + NumberMgt.random(monster.money.min, monster.money.max),
         0,
      );
   };

   interface ComputeLootRarityProps {
      monsterName: MonsterName;
      monsterType: MonsterType;
      monsterLevel: number;
      areaBonus: number;
      prospect: number;
   }

   interface ComputeLootProbabilityProps extends ComputeLootRarityProps {
      rarity: ItemRarity;
   }

   export const computeLootProbability = ({
      monsterType,
      monsterLevel,
      rarity,
      areaBonus,
      prospect,
   }: ComputeLootProbabilityProps): number => {
      const baseProbability = BASE_PROBABILITIES[rarity];
      const monsterRate = MONSTER_TYPE_RATE[monsterType];
      const exponentialRate = EXPONENTIAL_RATES[rarity];
      const growthFactor = GROWTH_FACTORS[rarity];

      return (
         (baseProbability *
            (1 + (growthFactor * prospect) / 100 - 0.003) *
            Math.exp((exponentialRate * (monsterLevel - 1)) / (MAXIMUM_LEVEL - 1)) *
            monsterRate *
            areaBonus) /
         100
      );
   };

   export const computeLootRarity = (props: ComputeLootRarityProps): ItemRarity | null => {
      const [
         commonProbability,
         uncommonProbability,
         rareProbability,
         epicProbability,
         uniqueProbability,
      ] = rarities.map((rarity) => computeLootProbability({ ...props, rarity }));

      const random = Math.random();

      if (random <= uniqueProbability) {
         return 'unique';
      }

      if (random <= epicProbability) {
         return 'epic';
      }

      if (random <= rareProbability) {
         return 'rare';
      }

      if (random <= uncommonProbability) {
         return 'uncommon';
      }

      if (random <= commonProbability) {
         return 'common';
      }

      return null;
   };

   export const computeMonsterLootAttemps = (props: ComputeLootRarityProps): number => {
      const probabilities = rarities.map((rarity) => computeLootProbability({ ...props, rarity }));
      const probabilitiesSum = probabilities.reduce((acc, probability) => acc + probability, 0);

      const attempts = Math.floor(probabilitiesSum);
      const additionalAttemptProbability = probabilitiesSum - attempts;
      const additionalAttempt = Math.random() <= additionalAttemptProbability ? 1 : 0;
      const totalAttempts = attempts + additionalAttempt;

      return totalAttempts;
   };

   export const computeMonsterLoot = (props: ComputeLootRarityProps): Item[] => {
      const { monsterLevel, monsterName, monsterType } = props;
      const attempts = computeMonsterLootAttemps(props);

      const items = Array.from({ length: attempts }).map(() => {
         const rarity = computeLootRarity(props);

         if (rarity === null) {
            return null;
         }

         const rawItemLevel = monsterLevel + MONSTER_TYPE_ITEM_LEVEL_BONUS[monsterType];
         const itemLevel = Math.min(rawItemLevel, MAXIMUM_LEVEL);

         return ItemMgt.generateItem({ rarity, monsterName, itemLevel });
      });

      return ArrayMgt.filterNullish(items);
   };

   interface ComputeMonstersLootProps {
      monsters: Monster[];
      areaBonus: number;
      prospect: number;
   }

   export const computeMonstersLoot = ({
      monsters,
      areaBonus,
      prospect,
   }: ComputeMonstersLootProps): Item[] => {
      return monsters.reduce((acc, monster) => {
         const monsterLoot = computeMonsterLoot({
            monsterName: monster.name,
            monsterType: monster.type,
            monsterLevel: monster.level,
            areaBonus,
            prospect,
         });

         return [...acc, ...monsterLoot];
      }, [] as Item[]);
   };
}
