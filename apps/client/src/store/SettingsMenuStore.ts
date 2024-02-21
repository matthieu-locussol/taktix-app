import { appWindow } from '@tauri-apps/api/window';
import i18n from 'i18next';
import { makeAutoObservable } from 'mobx';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, TranslationKey, translations } from 'shared/src/data/translations';
import { isLanguage, zLanguage } from 'shared/src/types/Language';
import { z } from 'zod';
import { isTauri } from '../utils/tauri';
import { Store } from './Store';

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
});

type SettingsMenuState = z.infer<typeof zSettingsMenuState>;

export class SettingsMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public defaultState: SettingsMenuState = {
      keyboardLayout: 'arrows',
      volume: 50,
      fullScreen: false,
      language: 'en',
      fullScreenMenus: {
         community: true,
         settings: true,
      },
   };

   public savedState: SettingsMenuState;

   public keyboardLayout = this.defaultState.keyboardLayout;

   public volume: number = this.defaultState.volume;

   public fullScreen: boolean = this.defaultState.fullScreen;

   public language = this.defaultState.language;

   public fullScreenMenus = { ...this.defaultState.fullScreenMenus };

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
      const savedState = localStorage.getItem('settings');

      if (savedState) {
         try {
            this.savedState = zSettingsMenuState.parse(JSON.parse(savedState));
         } catch (e) {
            this.savedState = this.defaultState;
         }
      } else {
         this.savedState = this.defaultState;
      }

      i18n
         .use(initReactI18next)
         .init({
            resources: translations,
            lng: this.savedState.language,
            fallbackLng: DEFAULT_LANGUAGE,
            interpolation: {
               escapeValue: false,
            },
         })
         .then(() => {
            this.setLanguage(this.savedState.language);
         });
   }

   public open(): void {
      this.isOpened = true;
   }

   public close(): void {
      this.isOpened = false;
   }

   public toggleFullScreenMenu(menu: keyof SettingsMenuState['fullScreenMenus']): void {
      this.setFullScreenMenu(menu, !this.fullScreenMenus[menu]);
   }

   public setKeyboardLayout(layout: string): void {
      this.keyboardLayout = layout;
   }

   public setVolume(volume: number): void {
      this.volume = volume;

      this._store.gameStore.game.sound.volume = volume / 100;
   }

   public async setFullScreen(fullScreen: boolean): Promise<void> {
      this.fullScreen = fullScreen;

      if (isTauri()) {
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

      i18n.changeLanguage(this.language);
      this._store.discordStore.updateDiscordRichPresence();
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
   }

   public saveChanges(): void {
      this.savedState = {
         keyboardLayout: this.keyboardLayout,
         volume: this.volume,
         fullScreen: this.fullScreen,
         language: this.language,
         fullScreenMenus: this.fullScreenMenus,
      };

      localStorage.setItem('settings', JSON.stringify(this.savedState));
      this.close();
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
         })
      );
   }
}
