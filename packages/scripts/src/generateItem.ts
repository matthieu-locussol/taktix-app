import { Item, ItemMgt, NumberMgt, rarities } from 'shared';

const generateItem = () => {
   const ITEMS: Item[] = [];

   console.time('Generation time');

   for (let i = 0; i < 10; i++) {
      const neededRarity = rarities[NumberMgt.random(0, rarities.length - 2)];
      const item = ItemMgt.generateItem({
         type: 'axe1H',
         rarity: neededRarity,
         level: 12,
         uniqueId: null,
      });

      const computedRarity = ItemMgt.getRarity(item);
      if (computedRarity !== neededRarity) {
         throw new Error(`Rarity mismatch: ${computedRarity} !== ${neededRarity}`);
      }

      const computedName = ItemMgt.getName(item);
      if (!computedName) {
         throw new Error(`Name is empty`);
      }

      ITEMS.push(item);
   }

   console.log(JSON.stringify(ITEMS, null, 3));
   console.timeEnd('Generation time');
};

generateItem();
