import { makeAutoObservable } from 'mobx';

export class NewsStore {
   public serverOnline: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   setServerOnline(serverOnline: boolean) {
      this.serverOnline = serverOnline;
   }

   get status() {
      return this.serverOnline ? 'online' : 'offline';
   }
}
