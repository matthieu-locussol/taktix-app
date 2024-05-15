import { makeAutoObservable } from 'mobx';
import { Store } from './Store';

const CHATBOX_HEIGHT_STEPS = [15, 30, 100];

export class HudStore {
   private _store: Store;

   public isGridVisible: boolean = false;

   public isMinimapVisible: boolean = true;

   /** Width in vw */
   public chatboxWidth: number = 40;

   /** Height in vh */
   public chatboxHeight: number = CHATBOX_HEIGHT_STEPS[0];

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
      this._store.soundsStore.play('check');

      const scene = await this._store.gameStore.getCurrentScene();
      scene.setGridVisibility(this.isGridVisible);
   }

   public async toggleMinimap(): Promise<void> {
      this.isMinimapVisible = !this.isMinimapVisible;
      this._store.soundsStore.play('check');

      const scene = await this._store.gameStore.getCurrentScene();
      scene.setMinimapVisibility(this.isMinimapVisible);
   }

   public setChatboxWidth(width: number): void {
      this.chatboxWidth = width;
   }

   public setChatboxHeight(height: number): void {
      this.chatboxHeight = height;
   }

   public get canIncreaseChatboxHeight(): boolean {
      return CHATBOX_HEIGHT_STEPS.indexOf(this.chatboxHeight) < CHATBOX_HEIGHT_STEPS.length - 1;
   }

   public increaseChatboxHeight(): void {
      if (this.canIncreaseChatboxHeight) {
         this.setChatboxHeight(
            CHATBOX_HEIGHT_STEPS[CHATBOX_HEIGHT_STEPS.indexOf(this.chatboxHeight) + 1],
         );

         this._store.soundsStore.play('check');
      }
   }

   public get canDecreaseChatboxHeight(): boolean {
      return CHATBOX_HEIGHT_STEPS.indexOf(this.chatboxHeight) > 0;
   }

   public decreaseChatboxHeight(): void {
      if (this.canDecreaseChatboxHeight) {
         this.setChatboxHeight(
            CHATBOX_HEIGHT_STEPS[CHATBOX_HEIGHT_STEPS.indexOf(this.chatboxHeight) - 1],
         );

         this._store.soundsStore.play('check');
      }
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
