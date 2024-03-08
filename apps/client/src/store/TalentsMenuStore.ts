import { makeAutoObservable, runInAction } from 'mobx';
import { Store } from './Store';

export class TalentsMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public loading: boolean = false;

   public talents: unknown[] = [];

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;

      this.fetchTalents();
   }

   private async fetchTalents() {
      runInAction(() => {
         this.loading = true;
      });

      try {
         // const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/talents`);
         // const json = await response.json();
         // const { talents } = zTalentsSchema.parse(json);

         runInAction(() => {
            // this.talents = talents;
            this.loading = false;
         });
      } catch (error) {
         runInAction(() => {
            this.talents = [];
            this.loading = false;
         });
      }
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
