import { describe, expect, it } from 'vitest';
import { NewsStore } from './NewsStore';

describe('NewsStore', () => {
   it('should be initialized', () => {
      const store = new NewsStore();

      expect(store).toBeDefined();
      expect(store.status).toBe(false);
   });

   it('should set the server online', () => {
      const store = new NewsStore();
      store.setServerOnline(true);
      expect(store.status).toBe(true);
   });

   it('should return the status', () => {
      const store = new NewsStore();

      store.setServerOnline(true);
      expect(store.status).toBe('online');

      store.setServerOnline(false);
      expect(store.status).toBe('offline');
   });
});
