import { makeAutoObservable } from 'mobx';
import { Store } from './Store';

export class NonoClickerMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public setIsOpened(isOpened: boolean): void {
      this.isOpened = isOpened;
      this._store.soundsStore.play('check');
   }

   public open(): void {
      this.setIsOpened(true);
   }

   public close(): void {
      this.setIsOpened(false);
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }
}
