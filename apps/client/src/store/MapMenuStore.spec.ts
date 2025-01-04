import { describe, expect, it, vi } from 'vitest';

import { MapMenuStore } from './MapMenuStore.ts';
import { Store } from './Store.ts';

vi.mock('./Store', () => {
   const characterStoreMock = {
      teleporters: ['MoonshadowHamletRoom'],
      map: 'ForestRoom',
      money: 999_999,
   };

   const soundsStoreMock = {
      play: () => ({}),
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      characterStore: characterStoreMock,
      soundsStore: soundsStoreMock,
   }));

   return { Store: MockedStore };
});

describe('MapMenuStore', () => {
   it('should be initialized', () => {
      const store = new MapMenuStore(new Store());

      expect(store).toBeDefined();
      expect(store.isOpened).toBe(false);
      expect(store.selectedRoom).toEqual(null);
   });

   it('should open', () => {
      const store = new MapMenuStore(new Store());

      store.open();
      expect(store.isOpened).toBe(true);
   });

   it('should close', () => {
      const store = new MapMenuStore(new Store());

      store.close();
      expect(store.isOpened).toBe(false);
   });

   it('should toggle', () => {
      const store = new MapMenuStore(new Store());

      store.toggle();
      expect(store.isOpened).toBe(true);

      store.toggle();
      expect(store.isOpened).toBe(false);
   });

   it('should set selected room', () => {
      const store = new MapMenuStore(new Store());

      expect(store.selectedRoom).toEqual(null);

      store.setSelectedRoom('MoonshadowHamletRoom');
      expect(store.selectedRoom).toEqual('MoonshadowHamletRoom');

      store.setSelectedRoom('MoonshadowHotelRoom');
      expect(store.selectedRoom).toEqual('MoonshadowHamletRoom');

      store.setSelectedRoom('MoonshadowInnRoom');
      expect(store.selectedRoom).toEqual('MoonshadowHamletRoom');
   });
});
