import { describe, expect, it, vi } from 'vitest';
import { MapMenuStore } from './MapMenuStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const MockedStore = vi.fn().mockImplementation(() => ({}));

   return { Store: MockedStore };
});

describe('MapMenuStore', () => {
   it('should be initialized', () => {
      const store = new MapMenuStore(new Store());

      expect(store).toBeDefined();
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
});
