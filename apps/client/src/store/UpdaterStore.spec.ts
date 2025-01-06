import { when } from 'mobx';
import { describe, expect, it, vi } from 'vitest';

import { Store } from './Store';
import { UpdaterStore } from './UpdaterStore';

vi.mock('./Store', () => {
   const MockedStore = vi.fn();

   return { Store: MockedStore };
});

const mocks = vi.hoisted(() => ({
   isTauri: vi.fn(),
   check: vi.fn(),
   relaunch: vi.fn(),
}));

vi.mock('../utils/tauri', () => ({
   isTauri: mocks.isTauri,
}));

vi.mock('@tauri-apps/plugin-updater', () => ({
   check: mocks.check,
}));

vi.mock('@tauri-apps/plugin-process', () => ({
   relaunch: mocks.relaunch,
}));

describe('UpdaterStore', () => {
   it('should be initialized', () => {
      const store = new UpdaterStore(new Store());

      expect(store.shouldUpdate).toEqual(null);
      expect(store.updateManifest).toEqual(undefined);
      expect(store.updating).toEqual(false);
      expect(store.progress).toEqual(0);
      expect(store.openUpdateModal).toEqual(false);
   });

   it('should check for updates', async () => {
      mocks.isTauri.mockReturnValue(false);

      const store = new UpdaterStore(new Store());

      await store.checkUpdate();
      expect(store.shouldUpdate).toEqual(false);
   });

   it('should check for updates on tauri (update not needed)', async () => {
      mocks.isTauri.mockReturnValue(true);
      mocks.check.mockResolvedValue({
         available: false,
         downloadAndInstall: vi.fn().mockResolvedValue(undefined),
      });

      const store = new UpdaterStore(new Store());

      await store.checkUpdate();

      when(
         () => store.shouldUpdate !== null,
         () => {
            expect(store.shouldUpdate).toEqual(false);
         },
      );
   });

   it('should check for updates on tauri (update needed)', async () => {
      mocks.isTauri.mockReturnValue(true);
      mocks.check.mockResolvedValue({
         available: true,
         downloadAndInstall: vi.fn().mockResolvedValue(undefined),
      });

      const store = new UpdaterStore(new Store());

      await store.checkUpdate();

      when(
         () => store.shouldUpdate !== null,
         () => {
            expect(store.shouldUpdate).toEqual(true);
         },
      );
   });

   it('should update', async () => {
      const store = new UpdaterStore(new Store());

      await store.update();

      expect(store.updating).toEqual(false);
      expect(store.openUpdateModal).toEqual(true);
   });

   it('should restart', async () => {
      mocks.relaunch.mockResolvedValue(undefined);

      const store = new UpdaterStore(new Store());

      store.restart();

      expect(store.openUpdateModal).toEqual(false);
   });

   it('should update progress', async () => {
      const store = new UpdaterStore(new Store());

      store.updateProgress(0.05);
      expect(store.progress.toFixed(2)).toEqual('5.00');

      store.updateProgress(0.1);
      expect(store.progress.toFixed(2)).toEqual('15.00');

      store.updateProgress(0.9);
      expect(store.progress.toFixed(2)).toEqual('100.00');
   });
});
