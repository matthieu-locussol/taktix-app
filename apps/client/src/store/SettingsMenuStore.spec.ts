import { describe, expect, it, vi } from 'vitest';
import { SettingsMenuStore } from './SettingsMenuStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const gameStoreMock = {
      game: {
         scale: {
            startFullscreen: vi.fn(),
            stopFullscreen: vi.fn(),
         },
         sound: {
            volume: 50,
         },
      },
   };

   const discordStoreMock = {
      updateDiscordRichPresence: vi.fn(),
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      gameStore: gameStoreMock,
      discordStore: discordStoreMock,
   }));

   return { Store: MockedStore };
});

describe('SettingsMenuStore', () => {
   it('should be initialized', () => {
      const store = new SettingsMenuStore(new Store());

      const defaults = {
         fullScreen: false,
         keyboardLayout: 'arrows',
         language: 'en',
         volume: 50,
         fullScreenMenus: {
            community: true,
            settings: true,
         },
         speedFactor: 1,
      };

      expect(store).toBeDefined();
      expect(store.isOpened).toBe(false);
      expect(store.defaultState).toEqual(defaults);
      expect(store.savedState).toEqual(defaults);
      expect(store.keyboardLayout).toBe('arrows');
      expect(store.volume).toBe(50);
      expect(store.fullScreen).toBe(false);
      expect(store.language).toBe('en');
      expect(store.speedFactor).toBe(1);
   });

   it('should open', () => {
      const store = new SettingsMenuStore(new Store());

      store.open();
      expect(store.isOpened).toBe(true);
   });

   it('should close', () => {
      const store = new SettingsMenuStore(new Store());

      store.close();
      expect(store.isOpened).toBe(false);
   });

   it('should set keyboard layout', () => {
      const store = new SettingsMenuStore(new Store());

      store.setKeyboardLayout('arrows');
      expect(store.keyboardLayout).toBe('arrows');

      store.setKeyboardLayout('wasd');
      expect(store.keyboardLayout).toBe('wasd');
   });

   it('should set volume', () => {
      const store = new SettingsMenuStore(new Store());

      store.setVolume(50);
      expect(store.volume).toBe(50);

      store.setVolume(100);
      expect(store.volume).toBe(100);
   });

   it('should set full screen', () => {
      const store = new SettingsMenuStore(new Store());

      store.setFullScreen(true);
      expect(store.fullScreen).toBe(true);

      store.setFullScreen(false);
      expect(store.fullScreen).toBe(false);
   });

   it('should set language', () => {
      const store = new SettingsMenuStore(new Store());

      store.setLanguage('en');
      expect(store.language).toBe('en');

      store.setLanguage('ja');
      expect(store.language).toBe('ja');
   });

   it('should set the speed factor', () => {
      const store = new SettingsMenuStore(new Store());

      store.setSpeedFactor(1);
      expect(store.speedFactor).toBe(1);

      store.setSpeedFactor(2);
      expect(store.speedFactor).toBe(2);
   });

   it('should save state', () => {
      const store = new SettingsMenuStore(new Store());

      store.setVolume(100);
      store.setFullScreen(true);
      store.setLanguage('ja');
      store.setFullScreenMenus({
         community: false,
         settings: true,
      });
      store.setSpeedFactor(2);

      store.saveChanges();

      expect(store.savedState).toEqual({
         fullScreen: true,
         keyboardLayout: 'arrows',
         language: 'ja',
         volume: 100,
         fullScreenMenus: {
            community: false,
            settings: true,
         },
         speedFactor: 2,
      });
   });

   it('should reset state', () => {
      const store = new SettingsMenuStore(new Store());

      store.setVolume(100);
      store.setFullScreen(true);
      store.setLanguage('ja');

      store.resetToDefaults();
      store.saveChanges();

      expect(store.savedState).toEqual(store.defaultState);
   });

   it('should cancel changes', () => {
      const store = new SettingsMenuStore(new Store());

      store.setVolume(100);
      store.setFullScreen(true);
      store.setLanguage('ja');

      store.cancelChanges();

      expect(store.savedState).toEqual(store.defaultState);
      expect(store.isOpened).toBe(false);
   });

   it('can save changes', () => {
      const store = new SettingsMenuStore(new Store());
      expect(store.canSave()).toBe(false);

      store.setVolume(100);
      expect(store.canSave()).toBe(true);

      store.setVolume(50);
      expect(store.canSave()).toBe(false);
   });
});
