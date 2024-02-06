import { when } from 'mobx';
import { describe, expect, it, vi } from 'vitest';
import { UpdaterStore } from './UpdaterStore';

const mocks = vi.hoisted(() => ({
   isTauri: vi.fn(),
   checkUpdate: vi.fn(),
   installUpdate: vi.fn(),
   relaunch: vi.fn(),
}));

vi.mock('../utils/tauri', () => ({
   isTauri: mocks.isTauri,
}));

vi.mock('@tauri-apps/api/updater', () => ({
   checkUpdate: mocks.checkUpdate,
   installUpdate: mocks.installUpdate,
}));

vi.mock('@tauri-apps/api/process', () => ({
   relaunch: mocks.relaunch,
}));

describe('UpdaterStore', () => {
   it('should be initialized', () => {
      const store = new UpdaterStore();

      expect(store.shouldUpdate).toEqual(undefined);
      expect(store.updateManifest).toEqual(undefined);
      expect(store.updating).toEqual(false);
      expect(store.progress).toEqual(0);
      expect(store.openUpdateModal).toEqual(false);
      expect(store.errorMessage).toEqual('');
   });

   it('should check for updates', async () => {
      mocks.isTauri.mockReturnValue(false);

      const store = new UpdaterStore();
      await store.checkUpdate();
      expect(store.shouldUpdate).toEqual(false);
   });

   it('should check for updates on tauri (update not needed)', async () => {
      mocks.isTauri.mockReturnValue(true);
      mocks.checkUpdate.mockResolvedValue({
         shouldUpdate: false,
         manifest: {},
      });

      const store = new UpdaterStore();
      await store.checkUpdate();

      when(
         () => store.shouldUpdate !== undefined,
         () => {
            expect(store.shouldUpdate).toEqual(false);
         },
      );
   });

   it('should check for updates on tauri (update needed)', async () => {
      mocks.isTauri.mockReturnValue(true);
      mocks.checkUpdate.mockResolvedValue({
         shouldUpdate: true,
         manifest: {},
      });

      const store = new UpdaterStore();
      await store.checkUpdate();

      when(
         () => store.shouldUpdate !== undefined,
         () => {
            expect(store.shouldUpdate).toEqual(true);
         },
      );
   });

   it('should update', async () => {
      mocks.installUpdate.mockResolvedValue(undefined);

      const store = new UpdaterStore();
      await store.update();

      expect(store.updating).toEqual(false);
      expect(store.openUpdateModal).toEqual(true);
   });

   it('should restart', async () => {
      mocks.relaunch.mockResolvedValue(undefined);

      const store = new UpdaterStore();
      store.restart();

      expect(store.openUpdateModal).toEqual(false);
   });

   it('should update progress', async () => {
      const store = new UpdaterStore();

      store.updateProgress(0.05);
      expect(store.progress.toFixed(2)).toEqual('5.00');

      store.updateProgress(0.1);
      expect(store.progress.toFixed(2)).toEqual('15.00');

      store.updateProgress(0.9);
      expect(store.progress.toFixed(2)).toEqual('100.00');
   });
});
