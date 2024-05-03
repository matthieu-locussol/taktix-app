import { describe, expect, it, vi } from 'vitest';
import { MapMenuStore } from './MapMenuStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const characterStoreMock = {
      teleporters: ['CloudsRoom', 'ForestRoom'],
      map: 'ForestRoom',
      money: 999_999,
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      characterStore: characterStoreMock,
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

      store.setSelectedRoom('CloudsRoom');
      expect(store.selectedRoom).toEqual('CloudsRoom');

      store.setSelectedRoom('HouseRoom');
      expect(store.selectedRoom).toEqual('CloudsRoom');

      store.setSelectedRoom('ForestRoom');
      expect(store.selectedRoom).toEqual('CloudsRoom');
   });
});
