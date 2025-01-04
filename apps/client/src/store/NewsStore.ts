import type { ChangelogSchema } from 'shared/src/schemas/ChangelogSchema.ts';
import type { StatusSchema } from 'shared/src/schemas/StatusSchema.ts';
import type { Store } from './Store.ts';

import { makeAutoObservable, runInAction } from 'mobx';
import { zChangelogSchema } from 'shared/src/schemas/ChangelogSchema.ts';

export class NewsStore {
   private _store: Store;

   public status: StatusSchema['status'] = 'offline';

   public loading: boolean = false;

   public changelogs: ChangelogSchema['changelogs'] = [];

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public async fetchChangelogs() {
      runInAction(() => {
         this.loading = true;
      });

      try {
         const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/changelog`);
         const json = await response.json();
         const { changelogs } = zChangelogSchema.parse(json);

         runInAction(() => {
            this.changelogs = changelogs;
            this.loading = false;
         });
      } catch (error) {
         console.error(error);

         runInAction(() => {
            this.changelogs = [];
            this.loading = false;
         });
      }
   }

   setStatus(status: StatusSchema['status']) {
      if (this.status === 'maintenance' && status === 'online') {
         this.fetchChangelogs();
         this._store.updaterStore.checkUpdate();
      }

      this.status = status;
   }
}
