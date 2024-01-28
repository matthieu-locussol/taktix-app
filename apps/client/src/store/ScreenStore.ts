import { makeAutoObservable } from 'mobx';
import { Store } from './Store';

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
      return this.screen === 'login'
         ? ScreenStore.SCREENS_NAMES.register
         : ScreenStore.SCREENS_NAMES.login;
   }

   get screenName() {
      return ScreenStore.SCREENS_NAMES[this.screen];
   }

   static get SCREENS_NAMES(): Record<Screen, string> {
      return {
         login: 'Log In',
         register: 'Register',
         characterSelection: 'Character Selection',
         characterCreation: 'Character Creation',
      };
   }
}
