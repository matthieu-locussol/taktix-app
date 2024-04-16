import { makeAutoObservable, runInAction } from 'mobx';
import { ChangelogSchema, zChangelogSchema } from 'shared/src/schemas/ChangelogSchema';
import { StatusSchema } from 'shared/src/schemas/StatusSchema';
import { Store } from './Store';

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
      } catch (_error) {
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
