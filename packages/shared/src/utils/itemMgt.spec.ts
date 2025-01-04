import { describe, expect, it } from 'vitest';

import { ItemMgt } from './itemMgt.ts';

describe('ItemMgt', () => {
   describe('RARITY_ORDER', () => {
      const rarityValues = Object.values(ItemMgt.RARITY_ORDER);
      const rarityCount = rarityValues.length;

      it('rarity should be ordered from 0 to N', () => {
         expect(rarityValues).toEqual(Array.from({ length: rarityCount }, (_, i) => i));
      });
   });

   describe('MAXIMUM_AFFIXES_PER_RARITY', () => {
      it('maximum affixes per rarity should be ascendingly ordered following rarity order', () => {
         const rarities = Object.keys(ItemMgt.MAXIMUM_AFFIXES_PER_RARITY) as Array<
            keyof typeof ItemMgt.MAXIMUM_AFFIXES_PER_RARITY
         >;
         const maximumAffixes = rarities.map(
            (rarity) => ItemMgt.MAXIMUM_AFFIXES_PER_RARITY[rarity],
         );
         const sortedMaximumAffixes = maximumAffixes.slice().sort((a, b) => a - b);

         expect(maximumAffixes).toEqual(sortedMaximumAffixes);
      });
   });

   describe('MAXIMUM_AFFIXES', () => {
      it('maximum affixes should be greater than 0', () => {
         expect(ItemMgt.MAXIMUM_AFFIXES).toBeGreaterThan(0);
      });

      it('maximum affixes should be greater than or equal to maximum affixes for epic rarity', () => {
         const maximumAffixesRarity = Object.keys(ItemMgt.MAXIMUM_AFFIXES_PER_RARITY).at(
            -1,
         ) as keyof typeof ItemMgt.MAXIMUM_AFFIXES_PER_RARITY;

         expect(ItemMgt.MAXIMUM_AFFIXES).toStrictEqual(
            ItemMgt.MAXIMUM_AFFIXES_PER_RARITY[maximumAffixesRarity],
         );
      });
   });
});
