import { makeAutoObservable } from 'mobx';

export class HudStore {
   public chatboxWidth: number = 30;

   public chatboxHeight: number = 15;

   public isChatboxVisible: boolean = true;

   constructor() {
      makeAutoObservable(this);
   }

   public setChatboxWidth(width: number): void {
      this.chatboxWidth = width;
   }

   public setChatboxHeight(height: number): void {
      this.chatboxHeight = height;
   }

   public toggleChatbox(): void {
      this.isChatboxVisible = !this.isChatboxVisible;
   }
}
