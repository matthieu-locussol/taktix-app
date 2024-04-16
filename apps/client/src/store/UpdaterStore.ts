import { relaunch } from '@tauri-apps/api/process';
import { UpdateManifest, checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { makeAutoObservable, runInAction } from 'mobx';
import { isTauri } from '../utils/tauri';
import { Store } from './Store';

export class UpdaterStore {
   private _store: Store;

   public shouldUpdate: boolean | undefined = undefined;

   public updateManifest: UpdateManifest | undefined = undefined;

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
            const updateResult = await checkUpdate();

            runInAction(() => {
               this.shouldUpdate = updateResult.shouldUpdate;
               this.updateManifest = updateResult.manifest;
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

         await installUpdate();

         runInAction(() => {
            this.updating = false;
            this.openUpdateModal = true;
         });
      } catch (_e) {
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
      } catch (_e) {
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
