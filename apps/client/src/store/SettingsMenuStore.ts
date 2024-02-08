import { makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { Store } from './Store';

export const keyboardLayouts = [
   { value: 'arrows', label: 'Arrows' },
   { value: 'wasd', label: 'WASD' },
   { value: 'zqsd', label: 'ZQSD' },
];

export const languages = [
   { value: 'en', label: '🇬🇧 English' },
   { value: 'fr', label: '🇫🇷 Français' },
   { value: 'ja', label: '🇯🇵 日本語' },
];

const zSettingsMenuState = z.object({
   keyboardLayout: z.string(),
   volume: z.number(),
   fullScreen: z.boolean(),
   language: z.string(),
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
   };

   public savedState: SettingsMenuState;

   public keyboardLayout = this.defaultState.keyboardLayout;

   public volume: number = this.defaultState.volume;

   public fullScreen: boolean = this.defaultState.fullScreen;

   public language = this.defaultState.language;

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
   }

   public open(): void {
      this.isOpened = true;
   }

   public close(): void {
      this.isOpened = false;
   }

   public setKeyboardLayout(layout: string): void {
      this.keyboardLayout = layout;
   }

   public setVolume(volume: number): void {
      this.volume = volume;

      this._store.gameStore.game.sound.volume = volume / 100;
   }

   public setFullScreen(fullScreen: boolean, skipPhaserUpdate?: boolean): void {
      this.fullScreen = fullScreen;

      if (!skipPhaserUpdate) {
         if (fullScreen) {
            this._store.gameStore.game.scale.startFullscreen();
         } else {
            this._store.gameStore.game.scale.stopFullscreen();
         }
      }
   }

   public setLanguage(language: string): void {
      this.language = language;
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
   }

   public saveChanges(): void {
      this.savedState = {
         keyboardLayout: this.keyboardLayout,
         volume: this.volume,
         fullScreen: this.fullScreen,
         language: this.language,
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
         })
      );
   }
}
