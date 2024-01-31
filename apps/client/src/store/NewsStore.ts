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
      return `
         <b>January, 31th 2024</b><br />
         - Animated tiles<br />
         - Players indicators on minimap<br />
         - Players names always visible<br />
         <br />
         <b>January, 30th 2024</b><br />
         - Improved HUD<br />
         - Added a minimap toggle<br />
         - Added a transparency toggle<br />
         <br />
         <b>January, 29th 2024</b><br />
         - Improved pathfinding<br />
         <br />
         <b>January, 28th 2024</b><br />
         - Different music in the menus<br />
         - Added a minimap<br />
         <br />
         <b>January, 27th 2024</b><br />
         - Updated logo<br />
         - Optional credentials memorization<br />
         - Added a zoom system<br />
         - Fixed multiplayer synchronization issues<br />
         - Added Discord Rich Presence support<br />
         <br />
         <b>January, 25th 2024</b><br />
         - Reworked the movement system to be click-based instead of keyboard-based<br />
         - Added colors to the chat<br />
         - Added a minimalist changelog 👀
      `;
   }
}
