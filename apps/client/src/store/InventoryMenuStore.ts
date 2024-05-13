import { makeAutoObservable } from 'mobx';
import { Item, ItemType } from 'shared/src/types/Item';
import { ItemMgt } from 'shared/src/utils/itemMgt';
import { SortOption } from '../ui/hud/components/ItemsSortSelector';
import { Store } from './Store';

type InventoryMode = 'normal' | 'recycle';

export class InventoryMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public mode: InventoryMode = 'normal';

   public itemsToRecycle: number[] = [];

   public recycleDialogOpened: boolean = false;

   public recycleLoading: boolean = false;

   public obtainedGachix: number = 0;

   public gachixGainedDialogOpened: boolean = false;

   public sortOption: SortOption = 'noSort';

   public isSortMenuOpened: boolean = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public open(): void {
      this.isOpened = true;
   }

   public close(): void {
      this.isOpened = false;
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }

   public setMode(mode: InventoryMode): void {
      this.mode = mode;

      this.itemsToRecycle = [];
   }

   public toggleMode(mode: InventoryMode): void {
      if (this.mode === mode) {
         this.mode = 'normal';
      } else {
         this.mode = mode;
      }

      this.itemsToRecycle = [];
   }

   public addItemToRecycle(id: number): void {
      this.itemsToRecycle.push(id);
   }

   public removeItemToRecycle(id: number): void {
      this.itemsToRecycle = this.itemsToRecycle.filter((itemId) => itemId !== id);
   }

   public toggleItemToRecycle(id: number): void {
      if (this.itemsToRecycle.includes(id)) {
         this.removeItemToRecycle(id);
      } else {
         this.addItemToRecycle(id);
      }
   }

   public openRecycleDialog(): void {
      this.recycleDialogOpened = true;
   }

   public closeRecycleDialog(): void {
      this.recycleDialogOpened = false;
      this.setRecycleLoading(false);
   }

   public setRecycleLoading(loading: boolean): void {
      this.recycleLoading = loading;
   }

   public recycleItems(): void {
      this._store.colyseusStore.recycle(this.itemsToRecycle);
      this.setRecycleLoading(true);
   }

   public openGachixGainedDialog(): void {
      this.gachixGainedDialogOpened = true;
   }

   public closeGachixGainedDialog(): void {
      this.gachixGainedDialogOpened = false;
      this.setMode('normal');
   }

   public setObtainedGachix(gachix: number): void {
      this.obtainedGachix = gachix;
   }

   public get areAllCommonItemsSelectedToRecycle(): boolean {
      return (
         this._store.characterStore.commonInventoryItems.length > 0 &&
         this._store.characterStore.commonInventoryItems.every(({ id }) =>
            this.itemsToRecycle.includes(id),
         )
      );
   }

   public selectAllCommonItemsToRecycle(): void {
      this._store.characterStore.commonInventoryItems.map(({ id }) => this.addItemToRecycle(id));
   }

   public deselectAllCommonItemsToRecycle(): void {
      this._store.characterStore.commonInventoryItems.map(({ id }) => this.removeItemToRecycle(id));
   }

   public toggleAllCommonItemsToRecycle(): void {
      if (this.areAllCommonItemsSelectedToRecycle) {
         this.deselectAllCommonItemsToRecycle();
      } else {
         this.selectAllCommonItemsToRecycle();
      }
   }

   public get areAllUncommonItemsSelectedToRecycle(): boolean {
      return (
         this._store.characterStore.uncommonInventoryItems.length > 0 &&
         this._store.characterStore.uncommonInventoryItems.every(({ id }) =>
            this.itemsToRecycle.includes(id),
         )
      );
   }

   public selectAllUncommonItemsToRecycle(): void {
      this._store.characterStore.uncommonInventoryItems.map(({ id }) => this.addItemToRecycle(id));
   }

   public deselectAllUncommonItemsToRecycle(): void {
      this._store.characterStore.uncommonInventoryItems.map(({ id }) =>
         this.removeItemToRecycle(id),
      );
   }

   public toggleAllUncommonItemsToRecycle(): void {
      if (this.areAllUncommonItemsSelectedToRecycle) {
         this.deselectAllUncommonItemsToRecycle();
      } else {
         this.selectAllUncommonItemsToRecycle();
      }
   }

   public get areAllRareItemsSelectedToRecycle(): boolean {
      return (
         this._store.characterStore.rareInventoryItems.length > 0 &&
         this._store.characterStore.rareInventoryItems.every(({ id }) =>
            this.itemsToRecycle.includes(id),
         )
      );
   }

   public selectAllRareItemsToRecycle(): void {
      this._store.characterStore.rareInventoryItems.map(({ id }) => this.addItemToRecycle(id));
   }

   public deselectAllRareItemsToRecycle(): void {
      this._store.characterStore.rareInventoryItems.map(({ id }) => this.removeItemToRecycle(id));
   }

   public toggleAllRareItemsToRecycle(): void {
      if (this.areAllRareItemsSelectedToRecycle) {
         this.deselectAllRareItemsToRecycle();
      } else {
         this.selectAllRareItemsToRecycle();
      }
   }

   public get areAllEpicItemsSelectedToRecycle(): boolean {
      return (
         this._store.characterStore.epicInventoryItems.length > 0 &&
         this._store.characterStore.epicInventoryItems.every(({ id }) =>
            this.itemsToRecycle.includes(id),
         )
      );
   }

   public selectAllEpicItemsToRecycle(): void {
      this._store.characterStore.epicInventoryItems.map(({ id }) => this.addItemToRecycle(id));
   }

   public deselectAllEpicItemsToRecycle(): void {
      this._store.characterStore.epicInventoryItems.map(({ id }) => this.removeItemToRecycle(id));
   }

   public toggleAllEpicItemsToRecycle(): void {
      if (this.areAllEpicItemsSelectedToRecycle) {
         this.deselectAllEpicItemsToRecycle();
      } else {
         this.selectAllEpicItemsToRecycle();
      }
   }

   public sortBy(sortOption: SortOption): void {
      this.sortOption = sortOption;
   }

   public get sortedInventoryItems() {
      if (this.sortOption === null) {
         return this._store.characterStore.inventoryItems;
      }

      return this._store.characterStore.inventoryItems.slice().sort((a, b) => {
         const aRarity = ItemMgt.RARITY_ORDER[ItemMgt.getRarity(a)];
         const bRarity = ItemMgt.RARITY_ORDER[ItemMgt.getRarity(b)];

         switch (this.sortOption) {
            case 'typeAsc':
               return a.type.localeCompare(b.type);
            case 'typeDesc':
               return b.type.localeCompare(a.type);
            case 'rarityAsc':
               return aRarity - bRarity;
            case 'rarityDesc':
               return bRarity - aRarity;
            case 'levelAsc':
               return a.level - b.level;
            case 'levelDesc':
               return b.level - a.level;
            default:
               return 0;
         }
      });
   }

   public get equippedItemsByType(): Record<ItemType, Item | null> {
      return {
         sword1H: this._store.characterStore.equippedItemsMap.weapon1,
         mace1H: this._store.characterStore.equippedItemsMap.weapon1,
         axe1H: this._store.characterStore.equippedItemsMap.weapon1,
         sword2H: this._store.characterStore.equippedItemsMap.weapon1,
         mace2H: this._store.characterStore.equippedItemsMap.weapon1,
         axe2H: this._store.characterStore.equippedItemsMap.weapon1,
         wand: this._store.characterStore.equippedItemsMap.weapon1,
         bow: this._store.characterStore.equippedItemsMap.weapon1,
         dagger: this._store.characterStore.equippedItemsMap.weapon1,
         staff: this._store.characterStore.equippedItemsMap.weapon1,

         helmetE: this._store.characterStore.equippedItemsMap.helmet,
         helmetEH: this._store.characterStore.equippedItemsMap.helmet,
         helmetEM: this._store.characterStore.equippedItemsMap.helmet,
         helmetH: this._store.characterStore.equippedItemsMap.helmet,
         helmetHM: this._store.characterStore.equippedItemsMap.helmet,
         helmetM: this._store.characterStore.equippedItemsMap.helmet,

         chestplateE: this._store.characterStore.equippedItemsMap.chestplate,
         chestplateEH: this._store.characterStore.equippedItemsMap.chestplate,
         chestplateEM: this._store.characterStore.equippedItemsMap.chestplate,
         chestplateH: this._store.characterStore.equippedItemsMap.chestplate,
         chestplateHM: this._store.characterStore.equippedItemsMap.chestplate,
         chestplateM: this._store.characterStore.equippedItemsMap.chestplate,

         glovesE: this._store.characterStore.equippedItemsMap.gloves,
         glovesEH: this._store.characterStore.equippedItemsMap.gloves,
         glovesEM: this._store.characterStore.equippedItemsMap.gloves,
         glovesH: this._store.characterStore.equippedItemsMap.gloves,
         glovesHM: this._store.characterStore.equippedItemsMap.gloves,
         glovesM: this._store.characterStore.equippedItemsMap.gloves,

         bootsE: this._store.characterStore.equippedItemsMap.boots,
         bootsEH: this._store.characterStore.equippedItemsMap.boots,
         bootsEM: this._store.characterStore.equippedItemsMap.boots,
         bootsH: this._store.characterStore.equippedItemsMap.boots,
         bootsHM: this._store.characterStore.equippedItemsMap.boots,
         bootsM: this._store.characterStore.equippedItemsMap.boots,

         belt: this._store.characterStore.equippedItemsMap.belt,

         amulet: this._store.characterStore.equippedItemsMap.amulet,
         ring: this._store.characterStore.equippedItemsMap.ring1,

         quiver: this._store.characterStore.equippedItemsMap.offhand,
         orb: this._store.characterStore.equippedItemsMap.offhand,
         shield: this._store.characterStore.equippedItemsMap.offhand,

         relic: this._store.characterStore.equippedItemsMap.relic1,
      };
   }

   public openSortMenu(): void {
      this.isSortMenuOpened = true;
   }

   public closeSortMenu(): void {
      this.isSortMenuOpened = false;
   }
}
