import { makeAutoObservable } from 'mobx';
import { Store } from './Store';

export class HudStore {
   private _store: Store;

   public isGridVisible: boolean = false;

   public isMinimapVisible: boolean = true;

   public isTransparencyEnabled: boolean = false;

   /** Width in vw */
   public chatboxWidth: number = 40;

   /** Height in vh */
   public chatboxHeight: number = 15;

   /** Height in pixels */
   public chatboxInputHeight: number = 12;

   public isChatboxVisible: boolean = true;

   /** Width in vw */
   public characterWidth: number = 20;

   /** Height in vh */
   public characterHeight: number = 15;

   public isCharacterVisible: boolean = true;

   /** Width in vw */
   public menuWidth: number = 40;

   /** Height in vh */
   public menuHeight: number = 15;

   public isMenuVisible: boolean = true;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public async toggleGrid(): Promise<void> {
      this.isGridVisible = !this.isGridVisible;

      const scene = await this._store.gameStore.getCurrentScene();
      scene.setGridVisibility(this.isGridVisible);
   }

   public async toggleMinimap(): Promise<void> {
      this.isMinimapVisible = !this.isMinimapVisible;

      const scene = await this._store.gameStore.getCurrentScene();
      scene.setMinimapVisibility(this.isMinimapVisible);
   }

   public async toggleTransparency(): Promise<void> {
      this.isTransparencyEnabled = !this.isTransparencyEnabled;

      const scene = await this._store.gameStore.getCurrentScene();
      scene.setTransparency(this.isTransparencyEnabled);
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
