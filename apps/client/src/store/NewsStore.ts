import { makeAutoObservable, runInAction } from 'mobx';
import { ChangelogResults } from 'shared/src/routers/ChangelogResults';
import { StatusSchema } from 'shared/src/schemas/StatusSchema';

export class NewsStore {
   public status: StatusSchema['status'] = 'offline';

   public loading: boolean = false;

   public changelogs: ChangelogResults['changelogs'] = [];

   constructor() {
      makeAutoObservable(this);
   }

   public async fetchChangelogs() {
      runInAction(() => {
         this.loading = true;
      });

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/changelog`);
      const data: ChangelogResults = await response.json();

      runInAction(() => {
         this.changelogs = data.changelogs;
         this.loading = false;
      });
   }

   setStatus(status: StatusSchema['status']) {
      this.status = status;
   }
}
