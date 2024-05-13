import { makeAutoObservable } from 'mobx';
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
}
