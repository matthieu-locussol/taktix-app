import { describe, expect, it, vi } from 'vitest';

import { NewsStore } from './NewsStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const updaterStore = {
      checkUpdate: vi.fn(),
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      updaterStore,
   }));

   return { Store: MockedStore };
});

describe('NewsStore', () => {
   it('should be initialized', () => {
      const store = new NewsStore(new Store());

      expect(store).toBeDefined();
      expect(store.status).toBe('offline');
      expect(store.loading).toBe(false);
      expect(store.changelogs).toEqual([]);
   });

   it('should set the server online', () => {
      const store = new NewsStore(new Store());

      store.setStatus('online');
      expect(store.status).toBe('online');
   });

   it('should return the status', () => {
      const store = new NewsStore(new Store());

      store.setStatus('online');
      expect(store.status).toBe('online');

      store.setStatus('offline');
      expect(store.status).toBe('offline');

      store.setStatus('maintenance');
      expect(store.status).toBe('maintenance');
   });

   it('should fetch the changelogs', async () => {
      const store = new NewsStore(new Store());

      const mockResponse = {
         json: async () => ({
            changelogs: [
               {
                  id: 'v1',
                  date: '2021-01-01T00:00:00.000Z',
                  text: 'Initial release',
               },
            ],
         }),
      };

      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as Response);

      await store.fetchChangelogs();

      expect(fetchSpy).toHaveBeenCalledWith(`${import.meta.env.VITE_SERVER_URL}/changelog`);
      expect(store.changelogs).toEqual([
         {
            id: 'v1',
            date: '2021-01-01T00:00:00.000Z',
            text: 'Initial release',
         },
      ]);
   });
});
