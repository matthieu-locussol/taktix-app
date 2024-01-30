import { makeAutoObservable } from 'mobx';
import { Store } from './Store';

export class HudStore {
   private _store: Store;

   public isMinimapVisible: boolean = true;

   public isTransparencyEnabled: boolean = false;

   /** Width in vw */
   public chatboxWidth: number = 40;

   /** Height in vh */
   public chatboxHeight: number = 20;

   /** Height in pixels */
   public chatboxInputHeight: number = 20;

   public isChatboxVisible: boolean = true;

   /** Width in vw */
   public characterWidth: number = 20;

   /** Height in vh */
   public characterHeight: number = 20;

   public isCharacterVisible: boolean = true;

   /** Width in vw */
   public menuWidth: number = 40;

   /** Height in vh */
   public menuHeight: number = 20;

   public isMenuVisible: boolean = true;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public async toggleMinimap(): Promise<void> {
      this.isMinimapVisible = !this.isMinimapVisible;
      this._store.gameStore.setMinimapVisible(this.isMinimapVisible);
   }

   public toggleTransparency(): void {
      this.isTransparencyEnabled = !this.isTransparencyEnabled;
      this._store.gameStore.setTransparency(this.isTransparencyEnabled);
   }

   public setChatboxWidth(width: number): void {
      this.chatboxWidth = width;
   }

   public setChatboxHeight(height: number): void {
      this.chatboxHeight = height;
   }

   public setChatboxInputHeight(height: number): void {
      this.chatboxInputHeight = height;
   }

   public toggleChatbox(): void {
      this.isChatboxVisible = !this.isChatboxVisible;
   }

   public setCharacterWidth(width: number): void {
      this.characterWidth = width;
   }

   public setCharacterHeight(height: number): void {
      this.characterHeight = height;
   }

   public toggleCharacter(): void {
      this.isCharacterVisible = !this.isCharacterVisible;
   }

   public setMenuWidth(width: number): void {
      this.menuWidth = width;
   }

   public setMenuHeight(height: number): void {
      this.menuHeight = height;
   }

   public toggleMenu(): void {
      this.isMenuVisible = !this.isMenuVisible;
   }
}
