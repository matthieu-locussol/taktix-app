import type { Item } from 'shared/src/types/Item.ts';

import { rarities } from 'shared/src/types/Item.ts';
import { ItemMgt } from 'shared/src/utils/itemMgt.ts';
import { NumberMgt } from 'shared/src/utils/numberMgt.ts';

const generateItem = () => {
   const ITEMS: Item[] = [];

   console.time('Generation time');

   for (let i = 0; i < 10; i++) {
      const neededRarity = rarities[NumberMgt.random(0, rarities.length - 2)];
      const item = ItemMgt.generateItem({
         monsterName: 'enemy-green-slime',
         itemLevel: 12,
         rarity: neededRarity,
      });

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
