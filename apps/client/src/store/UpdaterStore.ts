import { relaunch } from '@tauri-apps/api/process';
import { UpdateManifest, checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { makeAutoObservable, runInAction } from 'mobx';
import { isTauri } from '../utils/tauri';

export class UpdaterStore {
   public shouldUpdate: boolean | undefined = undefined;

   public updateManifest: UpdateManifest | undefined = undefined;

   public updating: boolean = false;

   private _progress: number = 0;

   public openUpdateModal: boolean = false;

   public errorMessage: string = '';

   constructor() {
      makeAutoObservable(this);
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
      } catch (e) {
         runInAction(() => {
            this.errorMessage =
               'Sorry, an error occurred while updating Taktix. If it happens again, try reinstalling the game.';
         });
      }
   }

   restart() {
      try {
         relaunch();

         runInAction(() => {
            this.openUpdateModal = false;
         });
      } catch (e) {
         runInAction(() => {
            this.errorMessage =
               'Sorry, an error occurred while restarting Taktix. Try restarting it by yourself.';
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
