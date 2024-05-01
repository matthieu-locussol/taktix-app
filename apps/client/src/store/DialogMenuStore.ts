import { makeAutoObservable } from 'mobx';
import { Store } from './Store';

export interface ChoiceItem {
   text: string;
   callback: () => void;
   disabled?: boolean;
}

export interface DialogItem {
   name: string;
   content: string;
   avatar?: string;
   choices?: ChoiceItem[];
}

export class DialogMenuStore {
   private _store: Store;

   public dialogHeight: number = 0;

   public items: DialogItem[] = [];

   public hoveredItem: number = -1;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   private _handleKeyDown = (event: KeyboardEvent): void => {
      if (
         event.code === 'Enter' ||
         event.key === 'Enter' ||
         event.code === 'Space' ||
         event.key === ' '
      ) {
         this.nextDialogFromKeyboard();
      }

      if (event.code === 'ArrowDown' || event.key === 'ArrowDown') {
         this.selectNextItem();
      }

      if (event.code === 'ArrowUp' || event.key === 'ArrowUp') {
         this.selectPreviousItem();
      }
   };

   public openDialog(items: DialogItem[]): void {
      this._store.gameStore.enableKeyboard(false);
      window.addEventListener('keydown', this._handleKeyDown);
      this.items = [...items];
   }

   public selectPreviousItem(): void {
      if (this.currentChoices.length === 0) {
         return;
      }

      if (this.hoveredItem === -1) {
         this.setHoveredItem(0);
         return;
      }

      this.setHoveredItem(Math.max(this.hoveredItem - 1, 0));
   }

   public selectNextItem(): void {
      if (this.currentChoices.length === 0) {
         return;
      }

      if (this.hoveredItem === -1) {
         this.setHoveredItem(0);
         return;
      }

      this.setHoveredItem(Math.min(this.hoveredItem + 1, this.currentChoices.length - 1));
   }

   public closeDialog(): void {
      this.items = [];
      this.setDialogHeight(0);
      this.setHoveredItem(-1);
      window.removeEventListener('keydown', this._handleKeyDown);
      this._store.gameStore.enableKeyboard(true);
   }

   public setDialogHeight(height: number): void {
      this.dialogHeight = height;
   }

   public setHoveredItem(index: number): void {
      this.hoveredItem = index;
   }

   public nextDialog(): void {
      if (this.currentChoices.length > 0) {
         return;
      }

      this._goToNextDialog();
   }

   public nextDialogFromChoice(): void {
      if (
         this.hoveredItem === -1 ||
         this.currentChoices[this.hoveredItem] === undefined ||
         this.currentChoices[this.hoveredItem].disabled
      ) {
         return;
      }

      this.currentChoices[this.hoveredItem].callback();
      this._goToNextDialog();
   }

   public nextDialogFromKeyboard(): void {
      if (this.currentChoices.length > 0) {
         this.nextDialogFromChoice();
      } else {
         this.nextDialog();
      }
   }

   private _goToNextDialog(): void {
      if (this.items.length > 1) {
         this.items.shift();
      } else {
         this.closeDialog();
      }
   }

   public get currentItem(): DialogItem {
      return this.items[0];
   }

   public get currentChoices(): ChoiceItem[] {
      return this.currentItem?.choices ?? [];
   }

   public get isOpened(): boolean {
      return this.items.length > 0;
   }
}
