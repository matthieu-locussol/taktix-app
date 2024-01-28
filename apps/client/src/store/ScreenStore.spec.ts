import { describe, expect, it, vi } from 'vitest';
import { ScreenStore } from './ScreenStore';
import { Store } from './Store';

const mocks = vi.hoisted(() => ({
   updateDiscordRichPresence: vi.fn(),
}));

vi.mock('./Store', () => {
   const MockedStore = vi.fn();
   MockedStore.prototype.discordStore = vi.fn();
   MockedStore.prototype.discordStore.updateDiscordRichPresence = mocks.updateDiscordRichPresence;
   return { Store: MockedStore };
});

describe('ScreenStore', () => {
   it('should be initialized', () => {
      const store = new ScreenStore(new Store());

      expect(store.screen).toEqual('login');
      expect(store.loggedIn).toEqual(false);
   });

   it('should set screen', () => {
      const store = new ScreenStore(new Store());
      store.setScreen('register');
      expect(store.screen).toEqual('register');
   });

   it('should set loggedIn', () => {
      const store = new ScreenStore(new Store());
      store.setLoggedIn(true);
      expect(store.loggedIn).toEqual(true);
   });

   it('should switch between login and register', () => {
      const store = new ScreenStore(new Store());

      store.switchBetweenLoginAndRegister();
      expect(store.screen).toEqual('register');

      store.switchBetweenLoginAndRegister();
      expect(store.screen).toEqual('login');
   });

   it('should get loginOrRegisterOppositeName', () => {
      const store = new ScreenStore(new Store());

      expect(store.loginOrRegisterOppositeName).toEqual('Register');

      store.switchBetweenLoginAndRegister();
      expect(store.loginOrRegisterOppositeName).toEqual('Log In');
   });

   it('should get screenName', () => {
      const store = new ScreenStore(new Store());

      expect(store.screenName).toEqual('Log In');

      store.setScreen('register');
      expect(store.screenName).toEqual('Register');
   });
});
