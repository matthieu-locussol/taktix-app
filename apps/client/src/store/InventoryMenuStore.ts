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
}
