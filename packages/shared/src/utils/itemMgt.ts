import { z } from 'zod';
import { affixes } from '../data/affixes';
import { MonsterName } from '../data/monsters';
import {
   Affix,
   Item,
   ItemPosition,
   ItemRarity,
   ItemType,
   isBootsType,
   isChestplateType,
   isGlovesType,
   isHelmetType,
   isOffhandType,
   zAffix,
   zItemPosition,
   zItemType,
} from '../types/Item';
import { Statistic } from '../types/Statistic';
import { isWeapon1HType, isWeapon2HType, isWeaponType } from '../types/Weapon';
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
            position: ItemPosition.Inventory,
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
         position: ItemPosition.Inventory,
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
      const orderedPrefixes = item.prefixes.slice().sort((a, b) => b.tier - a.tier);
      const orderedSuffixes = item.suffixes.slice().sort((a, b) => b.tier - a.tier);

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

   export const serializeAffixes = (affixes: Affix[]): string => {
      return z
         .array(zAffix)
         .parse(affixes)
         .map(({ name, tier, statistics }) => {
            const stats = Object.entries(statistics)
               .map(([stat, value]) => `${stat}:${value}`)
               .join(';');

            return `${name}#${tier}#${stats}`;
         })
         .join('|');
   };

   export const deserializeAffixes = (affixes: string): Affix[] => {
      if (affixes === '') {
         return [];
      }

      return z.array(zAffix).parse(
         affixes
            .split('|')
            .map((affix) => {
               const [name, tier, stats] = affix.split('#');
               const statistics = stats.split(';').reduce((acc, stat) => {
                  const [key, value] = stat.split(':');
                  return { ...acc, [key]: Number(value) };
               }, {});

               return { name, tier: Number(tier), statistics };
            })
            .filter(({ name }) => name !== ''),
      );
   };

   export const serializeItem = (item: Item): string => {
      return JSON.stringify({
         id: item.id,
         isUnique: item.isUnique,
         type: item.type,
         level: item.level,
         requiredLevel: item.requiredLevel,
         prefixes: serializeAffixes(item.prefixes),
         suffixes: serializeAffixes(item.suffixes),
      });
   };

   export const serializePrismaItem = (
      item: Omit<Item, 'prefixes' | 'suffixes' | 'type'> & {
         prefixes: string;
         suffixes: string;
         type: string;
      },
   ): string => {
      return JSON.stringify({
         id: item.id,
         isUnique: item.isUnique,
         type: item.type,
         level: item.level,
         requiredLevel: item.requiredLevel,
         prefixes: item.prefixes,
         suffixes: item.suffixes,
         position: item.position,
      });
   };

   export const deserializeItem = (item: string): Item => {
      const { id, isUnique, type, level, requiredLevel, prefixes, suffixes, position } =
         JSON.parse(item);

      return {
         id,
         isUnique,
         type: zItemType.parse(type),
         level,
         requiredLevel,
         prefixes: deserializeAffixes(prefixes),
         suffixes: deserializeAffixes(suffixes),
         position: zItemPosition.parse(position),
      };
   };

   export const getEquippedItemsMap = (equippedItems: Item[]) => {
      const equippedWeapons = equippedItems.filter(({ type }) => isWeaponType(type));

      const equippedWeapon1 = equippedWeapons.at(0) ?? null;
      const equippedWeapon2 = equippedWeapons.at(1) ?? null;
      const equippedOffhand =
         equippedItems.find(({ type }) => isOffhandType(type)) ?? equippedWeapon2;

      const equippedHelmet = equippedItems.find(({ type }) => isHelmetType(type));
      const equippedChestplate = equippedItems.find(({ type }) => isChestplateType(type));
      const equippedGloves = equippedItems.find(({ type }) => isGlovesType(type));
      const equippedBoots = equippedItems.find(({ type }) => isBootsType(type));
      const equippedRings = equippedItems.filter(({ type }) => type === 'ring');
      const equippedRelics = equippedItems.filter(({ type }) => type === 'relic');
      const equippedAmulet = equippedItems.find(({ type }) => type === 'amulet');
      const equippedBelt = equippedItems.find(({ type }) => type === 'belt');

      return {
         weapon1: equippedWeapon1,
         offhand: equippedOffhand,
         helmet: equippedHelmet ?? null,
         chestplate: equippedChestplate ?? null,
         gloves: equippedGloves ?? null,
         boots: equippedBoots ?? null,
         ring1: equippedRings.at(0) ?? null,
         ring2: equippedRings.at(1) ?? null,
         relic1: equippedRelics.at(0) ?? null,
         relic2: equippedRelics.at(1) ?? null,
         relic3: equippedRelics.at(2) ?? null,
         relic4: equippedRelics.at(3) ?? null,
         relic5: equippedRelics.at(4) ?? null,
         relic6: equippedRelics.at(5) ?? null,
         amulet: equippedAmulet ?? null,
         belt: equippedBelt ?? null,
      } as const;
   };

   export const canEquipItem = (item: Item, level: number) => {
      return level >= item.level;
   };

   export const itemsToRemoveAfterEquip = (
      item: Item,
      equippedItems: Item[],
   ): { itemsToRemove: number[]; canEquip: boolean } => {
      const equippedItemsMap = getEquippedItemsMap(equippedItems);
      const itemsToRemove: Item[] = [];
      let canEquip: boolean = true;

      if (isWeapon2HType(item.type)) {
         if (equippedItemsMap.weapon1 !== null) {
            itemsToRemove.push(equippedItemsMap.weapon1);
         }

         if (
            equippedItemsMap.offhand !== null &&
            !(item.type === 'bow' && equippedItemsMap.offhand.type === 'quiver')
         ) {
            itemsToRemove.push(equippedItemsMap.offhand);
         }
      } else if (isOffhandType(item.type)) {
         if (equippedItemsMap.weapon1 !== null && isWeapon2HType(equippedItemsMap.weapon1.type)) {
            if (item.type === 'quiver') {
               if (equippedItemsMap.weapon1.type !== 'bow') {
                  canEquip = false;
               } else if (equippedItemsMap.offhand !== null) {
                  itemsToRemove.push(equippedItemsMap.offhand);
               }
            } else {
               canEquip = false;
            }
         } else if (
            equippedItemsMap.weapon1 !== null &&
            isWeapon1HType(equippedItemsMap.weapon1.type)
         ) {
            if (item.type === 'quiver') {
               canEquip = false;
            } else if (equippedItemsMap.offhand !== null) {
               itemsToRemove.push(equippedItemsMap.offhand);
            }
         }
      } else if (isWeapon1HType(item.type)) {
         if (equippedItemsMap.weapon1 !== null && isWeapon2HType(equippedItemsMap.weapon1.type)) {
            itemsToRemove.push(equippedItemsMap.weapon1);

            if (equippedItemsMap.offhand !== null) {
               itemsToRemove.push(equippedItemsMap.offhand);
            }
         } else if (
            equippedItemsMap.weapon1 !== null &&
            isWeapon1HType(equippedItemsMap.weapon1.type) &&
            equippedItemsMap.offhand !== null &&
            (isWeapon1HType(equippedItemsMap.offhand.type) ||
               isOffhandType(equippedItemsMap.offhand.type))
         ) {
            itemsToRemove.push(equippedItemsMap.weapon1);
         }
      } else if (isHelmetType(item.type)) {
         if (equippedItemsMap.helmet !== null) {
            itemsToRemove.push(equippedItemsMap.helmet);
         }
      } else if (isChestplateType(item.type)) {
         if (equippedItemsMap.chestplate !== null) {
            itemsToRemove.push(equippedItemsMap.chestplate);
         }
      } else if (isGlovesType(item.type)) {
         if (equippedItemsMap.gloves !== null) {
            itemsToRemove.push(equippedItemsMap.gloves);
         }
      } else if (isBootsType(item.type)) {
         if (equippedItemsMap.boots !== null) {
            itemsToRemove.push(equippedItemsMap.boots);
         }
      } else if (isOffhandType(item.type)) {
         if (equippedItemsMap.offhand !== null) {
            itemsToRemove.push(equippedItemsMap.offhand);
         }
      } else if (item.type === 'ring') {
         if (equippedItemsMap.ring1 !== null && equippedItemsMap.ring2 !== null) {
            itemsToRemove.push(equippedItemsMap.ring1);
         }
      } else if (item.type === 'relic') {
         if (
            equippedItemsMap.relic1 !== null &&
            equippedItemsMap.relic2 !== null &&
            equippedItemsMap.relic3 !== null &&
            equippedItemsMap.relic4 !== null &&
            equippedItemsMap.relic5 !== null &&
            equippedItemsMap.relic6 !== null
         ) {
            itemsToRemove.push(equippedItemsMap.relic1);
         }
      } else if (item.type === 'amulet') {
         if (equippedItemsMap.amulet !== null) {
            itemsToRemove.push(equippedItemsMap.amulet);
         }
      } else if (item.type === 'belt') {
         if (equippedItemsMap.belt !== null) {
            itemsToRemove.push(equippedItemsMap.belt);
         }
      }

      return {
         itemsToRemove: itemsToRemove.map(({ id }) => id),
         canEquip,
      };
   };
}
