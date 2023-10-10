import { makeAutoObservable } from 'mobx';

export type Screen = 'login' | 'register' | 'characterSelection' | 'characterCreation';

export class ScreenStore {
   public screen: Screen = 'login';

   constructor() {
      makeAutoObservable(this);
   }

   public setScreen(screen: Screen) {
      this.screen = screen;
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

   static get SCREENS_NAMES() {
      return {
         login: 'Log In',
         register: 'Register',
         characterSelection: 'Character Selection',
         characterCreation: 'Character Creation',
      };
   }
}
