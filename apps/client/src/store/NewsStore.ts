import { makeAutoObservable, runInAction } from 'mobx';
import { ChangelogSchema, zChangelogSchema } from 'shared/src/schemas/ChangelogSchema';
import { StatusSchema } from 'shared/src/schemas/StatusSchema';

export class NewsStore {
   public status: StatusSchema['status'] = 'offline';

   public loading: boolean = false;

   public changelogs: ChangelogSchema['changelogs'] = [];

   constructor() {
      makeAutoObservable(this);
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
         runInAction(() => {
            this.changelogs = [];
            this.loading = false;
         });
      }
   }

   setStatus(status: StatusSchema['status']) {
      this.status = status;
   }
}
