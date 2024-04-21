import {
   isPermissionGranted,
   requestPermission,
   sendNotification,
} from '@tauri-apps/api/notification';
import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';
import { TranslationKey } from 'shared/src/data/translations';
import { isTauri } from '../utils/tauri';

export class NotificationStore {
   constructor() {
      makeAutoObservable(this);
   }

   async askPermission() {
      if (isTauri()) {
         let permissionGranted = await isPermissionGranted();

         if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === 'granted';
         }

         if (permissionGranted) {
            this.sendNotification(
               'Permission granted',
               i18next.t('notificationsEnabled' satisfies TranslationKey),
            );
         }
      }
   }

   sendNotification(title: string, body: string) {
      if (isTauri()) {
         sendNotification({ title, body });
      }
   }
}
