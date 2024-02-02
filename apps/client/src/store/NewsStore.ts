import { makeAutoObservable } from 'mobx';
import { ChangelogResults } from 'shared/src/routers/ChangelogResults';

export class NewsStore {
   public serverOnline: boolean = false;

   public loading: boolean = false;

   public changelogs: ChangelogResults['changelogs'] = [];

   constructor() {
      makeAutoObservable(this);

      this.fetchChangelogs();
   }

   private async fetchChangelogs() {
      this.loading = true;

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/changelog`);
      const data: ChangelogResults = await response.json();

      this.changelogs = data.changelogs;
      this.loading = false;
   }

   setServerOnline(serverOnline: boolean) {
      this.serverOnline = serverOnline;
   }

   get status() {
      return this.serverOnline ? 'online' : 'offline';
   }
}
