import type { Update } from '@tauri-apps/plugin-updater';
import type { Store } from './Store.ts';

import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';
import { makeAutoObservable, runInAction } from 'mobx';

import { isTauri } from '../utils/tauri.ts';

export class UpdaterStore {
   private _store: Store;

   public shouldUpdate: boolean | undefined = undefined;

   public updateManifest: Update | undefined = undefined;

   public updating: boolean = false;

   private _progress: number = 0;

   public openUpdateModal: boolean = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   async checkUpdate() {
      if (isTauri()) {
         (async () => {
            const updateManifest = await check();

            runInAction(() => {
               if (updateManifest !== null) {
                  this.shouldUpdate = updateManifest.available;
                  this.updateManifest = updateManifest;
               }
            });
         })();
      } else {
         runInAction(() => {
            this.shouldUpdate = false;
         });
      }
   }

   async update() {
      try {
         runInAction(() => {
            this.updating = true;
         });

         if (this.updateManifest !== undefined) {
            await this.updateManifest.downloadAndInstall();
         }

         runInAction(() => {
            this.updating = false;
            this.openUpdateModal = true;
         });
      } catch (error) {
         console.error(error);

         runInAction(() => {
            this._store.loginStore.setErrorMessage('updateError');
         });
      }
   }

   restart() {
      try {
         relaunch();

         runInAction(() => {
            this.openUpdateModal = false;
         });
      } catch (error) {
         console.error(error);

         runInAction(() => {
            this._store.loginStore.setErrorMessage('restartError');
         });
      }
   }

   updateProgress(delta: number) {
      this._progress += delta;

      if (this._progress > 1) {
         this._progress = 1;
      }
   }

   get progress() {
      return this._progress * 100;
   }
}
