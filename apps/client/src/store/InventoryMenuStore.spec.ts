import { describe, expect, it, vi } from 'vitest';
import { InventoryMenuStore } from './InventoryMenuStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const MockedStore = vi.fn().mockImplementation(() => ({}));
   return { Store: MockedStore };
});

describe('InventoryMenuStore', () => {
   it('should be initialized', () => {
      const store = new InventoryMenuStore(new Store());

      expect(store).toBeDefined();
      expect(store.isOpened).toBe(false);
   });

   it('should open', () => {
      const store = new InventoryMenuStore(new Store());
      store.open();
      expect(store.isOpened).toBe(true);
   });

   it('should close', () => {
      const store = new InventoryMenuStore(new Store());
      store.close();
      expect(store.isOpened).toBe(false);
   });

   it('should toggle', () => {
      const store = new InventoryMenuStore(new Store());

      store.toggle();
      expect(store.isOpened).toBe(true);

      store.toggle();
      expect(store.isOpened).toBe(false);
   });
});
