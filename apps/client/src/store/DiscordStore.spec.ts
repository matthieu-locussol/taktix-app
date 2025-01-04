import { describe, expect, it, vi } from 'vitest';

import { DiscordStore } from './DiscordStore';
import { Store } from './Store';

const mocks = vi.hoisted(() => ({
   setDiscordRichPresence: vi.fn(),
   isTauri: vi.fn().mockReturnValue(true),
   getVersion: vi.fn().mockReturnValue('1.0.0'),
}));

vi.mock('./Store', () => {
   const pveFightStoreMock = {
      fightOngoing: false,
   };

   const screenStoreMock = {
      loggedIn: false,
      screen: 'Menu',
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      pveFightStore: pveFightStoreMock,
      screenStore: screenStoreMock,
   }));

   return { Store: MockedStore };
});

vi.mock('../utils/discord', () => ({
   setDiscordRichPresence: mocks.setDiscordRichPresence,
}));

vi.mock('../utils/tauri', () => ({
   isTauri: mocks.isTauri,
}));

vi.mock('../utils/version', () => ({
   getVersion: mocks.getVersion,
}));

vi.mock('i18next', () => ({
   default: {
      t: (str: string) => str,
   },
}));

describe('DiscordStore', () => {
   vi.useFakeTimers();
   const now = new Date().getTime();

   it('should be initialized', () => {
      const store = new DiscordStore(new Store());

      expect(store).toBeDefined();
   });

   it('should update discord rich presence', () => {
      const store = new DiscordStore(new Store());

      store.updateDiscordRichPresence();

      expect(mocks.isTauri).toHaveBeenCalled();
      expect(mocks.getVersion).toHaveBeenCalled();
      expect(mocks.setDiscordRichPresence).toHaveBeenCalledWith({
         details: 'inMenu',
         state: 'Menu',
         large_image: 'default',
         large_text: 'Taktix - 1.0.0',
         timestamp: now,
      });
   });
});
