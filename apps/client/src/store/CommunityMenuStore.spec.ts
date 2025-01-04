import { charactersSprites } from 'shared/src/data/charactersSprites';
import { ProfessionType } from 'shared/src/types/Profession';
import { describe, expect, it, vi } from 'vitest';

import { CommunityMenuStore } from './CommunityMenuStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const soundsStoreMock = {
      play: () => ({}),
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      soundsStore: soundsStoreMock,
   }));

   return { Store: MockedStore };
});

global.fetch = vi.fn(
   () =>
      Promise.resolve({
         ok: true,
         status: 200,
         json: () =>
            Promise.resolve({
               players: [
                  {
                     spritesheet: charactersSprites[0],
                     player: 'player',
                     level: 12,
                     profession: ProfessionType.Warrior,
                     map: 'map',
                  },
               ],
            }),
      }) as Promise<Response>,
);

describe('CommunityMenuStore', () => {
   it('should be initialized', () => {
      const store = new CommunityMenuStore(new Store());

      expect(store).toBeDefined();
   });

   it('should fetch players', async () => {
      const store = new CommunityMenuStore(new Store());
      const fetchSpy = vi.spyOn(global, 'fetch');

      await store.fetchPlayers();

      expect(fetchSpy).toHaveBeenCalledOnce();
      expect(store.players).toEqual([
         {
            spritesheet: charactersSprites[0],
            player: 'player',
            level: 12,
            profession: ProfessionType.Warrior,
            map: 'map',
         },
      ]);
      expect(store.loading).toBe(false);
   });

   it('should open', () => {
      const store = new CommunityMenuStore(new Store());

      store.open();
      expect(store.isOpened).toBe(true);
   });

   it('should close', () => {
      const store = new CommunityMenuStore(new Store());

      store.close();
      expect(store.isOpened).toBe(false);
   });

   it('should toggle', () => {
      const store = new CommunityMenuStore(new Store());

      store.toggle();
      expect(store.isOpened).toBe(true);

      store.toggle();
      expect(store.isOpened).toBe(false);
   });
});
