import type { TranslationKey } from 'shared/src/data/translations';
import type { Store } from './Store';

import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { changeLanguage, use } from 'i18next';
import { makeAutoObservable } from 'mobx';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, translations } from 'shared/src/data/translations';
import { isLanguage, zLanguage } from 'shared/src/types/Language';
import { z } from 'zod';

import { isTauri } from '../utils/tauri';
const appWindow = isTauri() ? getCurrentWebviewWindow() : null;

export const keyboardLayouts: {
   value: string;
   label: TranslationKey;
}[] = [
   { value: 'arrows', label: 'arrows' },
   { value: 'wasd', label: 'wasd' },
   { value: 'zqsd', label: 'zqsd' },
];

const zSettingsMenuState = z.object({
   keyboardLayout: z.string(),
   volume: z.number(),
   fullScreen: z.boolean(),
   language: zLanguage,
   fullScreenMenus: z.object({
      community: z.boolean(),
      settings: z.boolean(),
   }),
   speedFactor: z.number().refine((value) => [1, 1.5, 2].includes(value)),
});

type SettingsMenuState = z.infer<typeof zSettingsMenuState>;

export class SettingsMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public defaultState: SettingsMenuState = {
      keyboardLayout: 'arrows',
      volume: 10,
      fullScreen: false,
      language: 'en',
      fullScreenMenus: {
         community: true,
         settings: true,
      },
      speedFactor: 1,
   };

   public savedState: SettingsMenuState;

   public keyboardLayout = this.defaultState.keyboardLayout;

   public volume: number = this.defaultState.volume;

   public fullScreen: boolean = this.defaultState.fullScreen;

   public language = this.defaultState.language;

   public fullScreenMenus = { ...this.defaultState.fullScreenMenus };

   public speedFactor = this.defaultState.speedFactor;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
      const savedState = localStorage.getItem('settings');

      if (savedState) {
         try {
            this.savedState = zSettingsMenuState.parse(JSON.parse(savedState));
         } catch (error) {
            console.error(error);

            this.savedState = this.defaultState;
         }
      } else {
         this.savedState = this.defaultState;
      }

      use(initReactI18next)
         .init({
            resources: translations,
            lng: this.savedState.language,
            fallbackLng: DEFAULT_LANGUAGE,
            interpolation: {
               escapeValue: false,
            },
         })
         .then(() => {
            this.applyState(this.savedState);
         });
   }

   public setIsOpened(isOpened: boolean): void {
      this.isOpened = isOpened;
      this._store.soundsStore.play('check');
   }

   public open(): void {
      this.setIsOpened(true);
   }

   public close(): void {
      this.setIsOpened(false);
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }

   public toggleFullScreenMenu(menu: keyof SettingsMenuState['fullScreenMenus']): void {
      this.setFullScreenMenu(menu, !this.fullScreenMenus[menu]);
   }

   public setKeyboardLayout(layout: string): void {
      this.keyboardLayout = layout;
   }

   public setVolume(volume: number): void {
      this.volume = volume;

      try {
         this._store.soundsStore.adjustSoundsVolume(volume / 100);
         this._store.gameStore.game.sound.volume = volume / 100;
      } catch (error) {
         console.error(error);

         // Not a problem as the sound will be set when the game is initialized
      }
   }

   public async setFullScreen(fullScreen: boolean): Promise<void> {
      this.fullScreen = fullScreen;

      if (appWindow !== null) {
         const isTauriFullscreen = await appWindow.isFullscreen();

         if (fullScreen !== isTauriFullscreen) {
            appWindow.setFullscreen(fullScreen);
         }
      }
   }

   public setLanguage(language: string): void {
      if (isLanguage(language)) {
         this.language = language;
      } else {
         this.language = DEFAULT_LANGUAGE;
      }
   }

   public setFullScreenMenus(fullScreenMenus: SettingsMenuState['fullScreenMenus']): void {
      this.fullScreenMenus = { ...fullScreenMenus };
   }

   public setFullScreenMenu(
      menu: keyof SettingsMenuState['fullScreenMenus'],
      value: boolean,
   ): void {
      this.fullScreenMenus[menu] = value;
   }

   public setSpeedFactor(speedFactor: number): void {
      if (![1, 1.5, 2].includes(speedFactor)) {
         speedFactor = 1;
      } else {
         this.speedFactor = speedFactor;
      }
   }

   public resetToDefaults(): void {
      this.applyState(this.defaultState);
   }

   public cancelChanges(): void {
      this.applyState(this.savedState);
      this.close();
   }

   public applyState(state: SettingsMenuState): void {
      this.setKeyboardLayout(state.keyboardLayout);
      this.setVolume(state.volume);
      this.setFullScreen(state.fullScreen);
      this.setLanguage(state.language);
      this.setFullScreenMenus(state.fullScreenMenus);
      this.setSpeedFactor(state.speedFactor);
   }

   public saveChanges(): void {
      this.savedState = {
         keyboardLayout: this.keyboardLayout,
         volume: this.volume,
         fullScreen: this.fullScreen,
         language: this.language,
         fullScreenMenus: this.fullScreenMenus,
         speedFactor: this.speedFactor,
      };

      changeLanguage(this.language);
      this._store.discordStore.updateDiscordRichPresence();

      localStorage.setItem('settings', JSON.stringify(this.savedState));
   }

   public canSave(): boolean {
      return (
         JSON.stringify(this.savedState) !==
         JSON.stringify({
            keyboardLayout: this.keyboardLayout,
            volume: this.volume,
            fullScreen: this.fullScreen,
            language: this.language,
            fullScreenMenus: this.fullScreenMenus,
            speedFactor: this.speedFactor,
         })
      );
   }
}
