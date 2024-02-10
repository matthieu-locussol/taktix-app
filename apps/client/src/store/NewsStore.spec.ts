import { describe, expect, it, vi } from 'vitest';
import { NewsStore } from './NewsStore';

describe('NewsStore', () => {
   it('should be initialized', () => {
      const store = new NewsStore();

      expect(store).toBeDefined();
      expect(store.status).toBe('offline');
      expect(store.loading).toBe(false);
      expect(store.changelogs).toEqual([]);
   });

   it('should set the server online', () => {
      const store = new NewsStore();
      store.setStatus('online');
      expect(store.status).toBe('online');
   });

   it('should return the status', () => {
      const store = new NewsStore();

      store.setStatus('online');
      expect(store.status).toBe('online');

      store.setStatus('offline');
      expect(store.status).toBe('offline');

      store.setStatus('maintenance');
      expect(store.status).toBe('maintenance');
   });

   it('should fetch the changelogs', async () => {
      const store = new NewsStore();

      const mockResponse = {
         json: async () => ({
            changelogs: [
               {
                  version: '1.0.0',
                  changes: ['Initial release'],
               },
            ],
         }),
      };

      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as Response);

      await store.fetchChangelogs();

      expect(fetchSpy).toHaveBeenCalledWith(`${import.meta.env.VITE_SERVER_URL}/changelog`);
      expect(store.changelogs).toEqual([
         {
            version: '1.0.0',
            changes: ['Initial release'],
         },
      ]);
   });
});
