import { affixes } from '../data/affixes';
import { MonsterName } from '../data/monsters';
import { Item, ItemRarity, ItemType, zItemType } from '../types/Item';
import { Statistic } from '../types/Statistic';
import { _assert, _assertTrue } from './_assert';
import { NumberMgt } from './numberMgt';
import { StatisticMgt } from './statisticMgt';
import { StringMgt } from './stringMgt';

interface GenerateItemProps {
   monsterName: MonsterName;
   itemLevel: number;
   rarity: ItemRarity;
}

export namespace ItemMgt {
   export const MAXIMUM_PREFIXES = 3;

   export const MAXIMUM_SUFFIXES = 3;

   export const MAXIMUM_AFFIXES = MAXIMUM_PREFIXES + MAXIMUM_SUFFIXES;

   export const MAXIMUM_AFFIXES_PER_RARITY: Record<Exclude<ItemRarity, 'unique'>, number> = {
      common: 0,
      uncommon: 2,
      rare: 4,
      epic: 6,
   };

   export const RARITY_ORDER: Record<Exclude<ItemRarity, 'unique'>, number> = {
      common: 0,
      uncommon: 1,
      rare: 2,
      epic: 3,
   };

   export const ITEM_TYPE_WEIGHTS: Record<ItemType, number> = {
      helmetE: 15,
      helmetH: 15,
      helmetM: 15,
      helmetEH: 15,
      helmetEM: 15,
      helmetHM: 15,
      chestplateE: 15,
      chestplateH: 15,
      chestplateM: 15,
      chestplateEH: 15,
      chestplateEM: 15,
      chestplateHM: 15,
      bootsE: 15,
      bootsH: 15,
      bootsM: 15,
      bootsEH: 15,
      bootsEM: 15,
      bootsHM: 15,
      glovesE: 15,
      glovesH: 15,
      glovesM: 15,
      glovesEH: 15,
      glovesEM: 15,
      glovesHM: 15,
      belt: 15,
      shield: 15,
      quiver: 15,
      orb: 15,
      sword1H: 8,
      sword2H: 8,
      axe1H: 8,
      axe2H: 8,
      mace1H: 8,
      mace2H: 8,
      dagger: 8,
      staff: 8,
      wand: 8,
      bow: 8,
      amulet: 4,
      ring: 4,
      relic: 2,
   };

   export const ITEM_TYPE_PROBABILITIES: Record<ItemType, number> = Object.keys(
      ITEM_TYPE_WEIGHTS,
   ).reduce(
      (acc, typeStr) => {
         const type = zItemType.parse(typeStr);
         const weight = ITEM_TYPE_WEIGHTS[type];
         const totalWeight = Object.values(ITEM_TYPE_WEIGHTS).reduce(
            (acc, weight) => acc + weight,
            0,
         );
         const probability = weight / totalWeight;
         return { ...acc, [type]: probability };
      },
      {} as Record<ItemType, number>,
   );

   export const DEFAULT_ITEM_TYPE: ItemType = 'relic';

   export const generateItemType = (): ItemType => {
      const random = Math.random();
      let accumulatedProbability = 0;

      for (const type of Object.keys(ITEM_TYPE_PROBABILITIES) as ItemType[]) {
         accumulatedProbability += ITEM_TYPE_PROBABILITIES[type];

         if (random < accumulatedProbability) {
            return type;
         }
      }

      return DEFAULT_ITEM_TYPE;
   };

   export const generateItem = (props: GenerateItemProps): Item => {
      const { itemLevel, rarity, monsterName } = props;
      const type = generateItemType();

      // TODO: implement unique items generation
      // pickup random unique item from the list for a given monster
      if (rarity === 'unique') {
         console.log(monsterName);

         const uniqueItem: Item = {
            id: -1,
            isUnique: true,
            type,
            level: itemLevel,
            requiredLevel: 1,
            prefixes: [],
            suffixes: [],
         };

         return uniqueItem;
      }

      const affixesCount = pickupRandomAffixesCount(rarity);

      let item: Item = {
         id: -1,
         isUnique: false,
         type,
         level: itemLevel,
         requiredLevel: 1,
         prefixes: [],
         suffixes: [],
      };

      let count = 0;
      while (count < affixesCount) {
         item = pickupRandomAffix(item);
         count++;
      }

      return item;
   };

   export const getAffixesCount = (item: Item): number => {
      return item.prefixes.length + item.suffixes.length;
   };

   export const getRarity = (item: Item): ItemRarity => {
      if (item.isUnique) {
         return 'unique';
      }

      const affixesCount = getAffixesCount(item);

      if (affixesCount <= MAXIMUM_AFFIXES_PER_RARITY.common) {
         return 'common';
      }

      if (affixesCount <= MAXIMUM_AFFIXES_PER_RARITY.uncommon) {
         return 'uncommon';
      }

      if (affixesCount <= MAXIMUM_AFFIXES_PER_RARITY.rare) {
         return 'rare';
      }

      return 'epic';
   };

   export const getName = (item: Item): string => {
      const orderedPrefixes = item.prefixes.sort((a, b) => b.tier - a.tier);
      const orderedSuffixes = item.suffixes.sort((a, b) => b.tier - a.tier);

      const prefix = orderedPrefixes.length > 0 ? orderedPrefixes[0].name : '';
      const suffix = orderedSuffixes.length > 0 ? orderedSuffixes[0].name : '';

      const prefixSpace = prefix === '' ? '' : ' ';
      const suffixSpace = suffix === '' ? '' : ' ';

      const name = StringMgt.toUpperCaseFirst(item.type);

      return `${prefix}${prefixSpace}${name}${suffixSpace}${suffix}`;
   };

   export const pickupRandomAffixesCount = (rarity: Exclude<ItemRarity, 'unique'>): number => {
      if (rarity === 'common') {
         return NumberMgt.random(0, MAXIMUM_AFFIXES_PER_RARITY.common);
      }

      if (rarity === 'uncommon') {
         return NumberMgt.random(
            MAXIMUM_AFFIXES_PER_RARITY.common + 1,
            MAXIMUM_AFFIXES_PER_RARITY.uncommon,
         );
      }

      if (rarity === 'rare') {
         return NumberMgt.random(
            MAXIMUM_AFFIXES_PER_RARITY.uncommon + 1,
            MAXIMUM_AFFIXES_PER_RARITY.rare,
         );
      }

      return NumberMgt.random(MAXIMUM_AFFIXES_PER_RARITY.rare + 1, MAXIMUM_AFFIXES);
   };

   export const pickupRandomAffix = (item: Item): Item => {
      if (hasEnoughAffixes(item)) {
         return item;
      }

      const isPrefix = NumberMgt.random(0, 1) === 0 && !hasEnoughPrefixes(item);
      if (isPrefix || hasEnoughSuffixes(item)) {
         return pickupRandomPrefix(item);
      }

      _assertTrue(!hasEnoughSuffixes(item), 'Item has enough suffixes');
      return pickupRandomSuffix(item);
   };

   export const pickupRandomPrefix = (item: Item): Item => {
      const existingPrefixes = item.prefixes.flatMap(({ statistics }) =>
         Object.keys(statistics),
      ) as Statistic[];
      const prefixesPool = Object.keys(affixes[item.type].prefixes) as Statistic[];
      const eligiblePrefixesPool = prefixesPool.filter(
         (prefix) =>
            !existingPrefixes.includes(prefix) &&
            affixes[item.type].prefixes[prefix]?.some(({ level }) => item.level >= level),
      );

      if (eligiblePrefixesPool.length === 0) {
         return item;
      }

      const prefixIdx = NumberMgt.random(0, eligiblePrefixesPool.length - 1);
      const prefix = eligiblePrefixesPool[prefixIdx];

      const prefixValuesPool = affixes[item.type].prefixes[prefix];
      _assert(prefixValuesPool, 'Prefix values pool is not defined');
      const eligiblePrefixValuesPool = prefixValuesPool
         .map((item, idx) => ({ ...item, tier: idx + 1 }))
         .filter(({ level }) => item.level >= level);

      const prefixValueIdx = NumberMgt.random(0, eligiblePrefixValuesPool.length - 1);
      const { name, min, max, tier, level } = eligiblePrefixValuesPool[prefixValueIdx];
      const prefixValue = StatisticMgt.STATISTICS_WITH_DECIMALS.includes(prefix)
         ? NumberMgt.randomFloat(min, max, 2)
         : NumberMgt.random(min, max);

      item.prefixes.push({
         name,
         tier,
         statistics: { [prefix]: prefixValue },
      });

      if (level > item.requiredLevel) {
         item.requiredLevel = level;
      }

      return item;
   };

   export const pickupRandomSuffix = (item: Item): Item => {
      const existingSuffixes = item.suffixes.flatMap(({ statistics }) =>
         Object.keys(statistics),
      ) as Statistic[];
      const suffixesPool = Object.keys(affixes[item.type].suffixes) as Statistic[];
      const eligibleSuffixesPool = suffixesPool.filter(
         (suffix) =>
            !existingSuffixes.includes(suffix) &&
            affixes[item.type].suffixes[suffix]?.some(({ level }) => item.level >= level),
      );

      if (eligibleSuffixesPool.length === 0) {
         return item;
      }

      const suffixIdx = NumberMgt.random(0, eligibleSuffixesPool.length - 1);
      const suffix = eligibleSuffixesPool[suffixIdx];

      const suffixValuesPool = affixes[item.type].suffixes[suffix];
      _assert(suffixValuesPool, 'Suffix values pool is not defined');
      const eligibleSuffixValuesPool = suffixValuesPool
         .map((item, idx) => ({ ...item, tier: idx + 1 }))
         .filter(({ level }) => item.level >= level);

      const suffixValueIdx = NumberMgt.random(0, eligibleSuffixValuesPool.length - 1);
      const { name, min, max, tier, level } = eligibleSuffixValuesPool[suffixValueIdx];
      const suffixValue = StatisticMgt.STATISTICS_WITH_DECIMALS.includes(suffix)
         ? NumberMgt.randomFloat(min, max, 2)
         : NumberMgt.random(min, max);

      item.suffixes.push({
         name,
         tier,
         statistics: { [suffix]: suffixValue },
      });

      if (level > item.requiredLevel) {
         item.requiredLevel = level;
      }

      return item;
   };

   export const hasEnoughPrefixes = (item: Item) => {
      return item.isUnique || item.prefixes.length >= MAXIMUM_PREFIXES;
   };

   export const hasEnoughSuffixes = (item: Item) => {
      return item.isUnique || item.suffixes.length >= MAXIMUM_SUFFIXES;
   };

   export const hasEnoughAffixes = (item: Item) => {
      return item.isUnique || getAffixesCount(item) >= MAXIMUM_AFFIXES;
   };
}
