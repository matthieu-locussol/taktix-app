import { relaunch } from '@tauri-apps/api/process';
import { UpdateManifest, checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { makeAutoObservable } from 'mobx';
import { isTauri } from '../utils/tauri';

export class UpdaterStore {
   public shouldUpdate: boolean | undefined = undefined;

   public updateManifest: UpdateManifest | undefined = undefined;

   public updating: boolean = false;

   public openUpdateModal: boolean = false;

   public errorMessage: string = '';

   constructor() {
      makeAutoObservable(this);
   }

   async checkUpdate() {
      if (isTauri()) {
         (async () => {
            const updateResult = await checkUpdate();
            this.shouldUpdate = updateResult.shouldUpdate;
            this.updateManifest = updateResult.manifest;
         })();
      } else {
         this.shouldUpdate = false;
      }
   }

   async update() {
      try {
         this.updating = true;
         await installUpdate();
         this.updating = false;
         this.openUpdateModal = true;
      } catch (e) {
         this.errorMessage =
            'Sorry, an error occurred while updating Taktix. If it happens again, try reinstalling the game.';
      }
   }

   restart() {
      try {
         relaunch();
         this.openUpdateModal = false;
      } catch (e) {
         this.errorMessage =
            'Sorry, an error occurred while restarting Taktix. Try restarting it by yourself.';
      }
   }
}
