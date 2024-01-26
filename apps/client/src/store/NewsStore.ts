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

   get changelog() {
      return `<b>January, 25th 2024</b><br />
         - Reworked the movement system to be click-based instead of keyboard-based<br />
         - Added colors to the chat<br />
         - Added a minimalist changelog 👀
      `;
   }
}
