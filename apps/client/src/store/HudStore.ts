import { makeAutoObservable } from 'mobx';

export class HudStore {
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

   constructor() {
      makeAutoObservable(this);
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
}
