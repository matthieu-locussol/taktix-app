import type { Store } from './Store';

import { makeAutoObservable } from 'mobx';

export type Screen = 'login' | 'register' | 'characterSelection' | 'characterCreation';

export class ScreenStore {
   private _store: Store;

   public screen: Screen = 'login';

   public loggedIn: boolean = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public setScreen(screen: Screen) {
      this.screen = screen;
      this._store.discordStore.updateDiscordRichPresence();
   }

   public setLoggedIn(loggedIn: boolean) {
      this.loggedIn = loggedIn;
      this._store.discordStore.updateDiscordRichPresence();
   }

   public switchBetweenLoginAndRegister() {
      if (this.screen === 'login') {
         this.screen = 'register';
      } else if (this.screen === 'register') {
         this.screen = 'login';
      } else {
         throw new Error(`Can't switch between login and register in screen '${this.screen}'`);
      }
   }

   public get loginOrRegisterOppositeName() {
      return this.screen === 'login' ? 'register' : 'login';
   }
}
