import { makeAutoObservable } from 'mobx';
import { Store } from './Store';

export class NonoClickerMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

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
}
