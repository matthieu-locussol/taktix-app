import { describe, expect, it } from 'vitest';
import { ScreenStore } from './ScreenStore';

describe('ScreenStore', () => {
   it('should be initialized', () => {
      const store = new ScreenStore();

      expect(store.screen).toEqual('login');
      expect(store.loggedIn).toEqual(false);
   });

   it('should set screen', () => {
      const store = new ScreenStore();
      store.setScreen('register');
      expect(store.screen).toEqual('register');
   });

   it('should set loggedIn', () => {
      const store = new ScreenStore();
      store.setLoggedIn(true);
      expect(store.loggedIn).toEqual(true);
   });

   it('should switch between login and register', () => {
      const store = new ScreenStore();

      store.switchBetweenLoginAndRegister();
      expect(store.screen).toEqual('register');

      store.switchBetweenLoginAndRegister();
      expect(store.screen).toEqual('login');
   });

   it('should get loginOrRegisterOppositeName', () => {
      const store = new ScreenStore();

      expect(store.loginOrRegisterOppositeName).toEqual('Register');

      store.switchBetweenLoginAndRegister();
      expect(store.loginOrRegisterOppositeName).toEqual('Log In');
   });

   it('should get screenName', () => {
      const store = new ScreenStore();

      expect(store.screenName).toEqual('Log In');

      store.setScreen('register');
      expect(store.screenName).toEqual('Register');
   });
});
