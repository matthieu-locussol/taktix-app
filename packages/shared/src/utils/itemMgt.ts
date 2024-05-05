import { affixes } from '../data/affixes';
import { Item, ItemRarity, ItemType } from '../types/Item';
import { Statistic } from '../types/Statistic';
import { _assert, _assertTrue } from './_assert';
import { NumberMgt } from './numberMgt';
import { StringMgt } from './stringMgt';

interface GenerateItemProps {
   level: number;
   type: ItemType;
   rarity: ItemRarity;
   uniqueId: number | null;
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

   export const generateItem = (props: GenerateItemProps): Item => {
      const { level, type, rarity, uniqueId } = props;

      // TODO: implement unique items generation
      if (rarity === 'unique') {
         _assert(uniqueId, 'uniqueId must be provided for unique items');

         const uniqueItem: Item = {
            id: -1,
            isUnique: true,
            type,
            level,
            requiredLevel: 0,
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
         level,
         requiredLevel: 1,
         prefixes: [],
         suffixes: [],
      };

      while (getAffixesCount(item) < affixesCount) {
         item = pickupRandomAffix(item);
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
      const existingPrefixes = Object.keys(item.prefixes) as Statistic[];
      const prefixesPool = Object.keys(affixes[item.type].prefixes) as Statistic[];
      const eligiblePrefixesPool = prefixesPool.filter(
         (prefix) =>
            !existingPrefixes.includes(prefix) &&
            affixes[item.type].prefixes[prefix]?.some(({ level }) => item.level >= level),
      );

      const prefixIdx = NumberMgt.random(0, eligiblePrefixesPool.length - 1);
      const prefix = eligiblePrefixesPool[prefixIdx];

      const prefixValuesPool = affixes[item.type].prefixes[prefix];
      _assert(prefixValuesPool, 'Prefix values pool is not defined');
      const eligiblePrefixValuesPool = prefixValuesPool
         .map((item, idx) => ({ ...item, tier: idx + 1 }))
         .filter(({ level }) => item.level >= level);

      const prefixValueIdx = NumberMgt.random(0, eligiblePrefixValuesPool.length - 1);
      const { name, min, max, tier, level } = eligiblePrefixValuesPool[prefixValueIdx];
      const prefixValue = NumberMgt.random(min, max);

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
      const existingSuffixes = Object.keys(item.suffixes) as Statistic[];
      const suffixesPool = Object.keys(affixes[item.type].suffixes) as Statistic[];
      const eligibleSuffixesPool = suffixesPool.filter(
         (suffix) =>
            !existingSuffixes.includes(suffix) &&
            affixes[item.type].suffixes[suffix]?.some(({ level }) => item.level >= level),
      );

      const suffixIdx = NumberMgt.random(0, eligibleSuffixesPool.length - 1);
      const suffix = eligibleSuffixesPool[suffixIdx];

      const suffixValuesPool = affixes[item.type].suffixes[suffix];
      _assert(suffixValuesPool, 'Suffix values pool is not defined');
      const eligibleSuffixValuesPool = suffixValuesPool
         .map((item, idx) => ({ ...item, tier: idx + 1 }))
         .filter(({ level }) => item.level >= level);

      const suffixValueIdx = NumberMgt.random(0, eligibleSuffixValuesPool.length - 1);
      const { name, min, max, tier, level } = eligibleSuffixValuesPool[suffixValueIdx];
      const suffixValue = NumberMgt.random(min, max);

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
