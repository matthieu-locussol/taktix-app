import { makeAutoObservable } from 'mobx';
import { Channel } from 'shared/src/types/Channel';
import { TimeMgt } from 'shared/src/utils/timeMgt';
import { SpriteType } from '../utils/spriteType';
import { Store } from './Store';

interface MenuItem {
   text: string;
   subMenu: SubMenuItem[];
}

interface SubMenuItem {
   text: string;
   callback: () => void;
}

export class ContextMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public positionX: number = 0;

   public positionY: number = 0;

   public sprites: Phaser.GameObjects.Sprite[] = [];

   public currentSubMenu: SubMenuItem[] = [];

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public openContextMenu(x: number, y: number, sprites: Phaser.GameObjects.Sprite[]): void {
      this.isOpened = true;
      this.positionX = x;
      this.positionY = y;
      this.sprites = [...sprites];
      this.currentSubMenu = [];

      this.sprites.forEach((sprite) => {
         sprite.setData('hovered', false);
      });
   }

   public closeContextMenu(): void {
      this.isOpened = false;
      this.positionX = 0;
      this.positionY = 0;
      this.sprites = [];
      this.currentSubMenu = [];
   }

   public get menu(): MenuItem[] {
      return this.sprites
         .slice()
         .sort(({ type: typeA }, { type: typeB }) => typeA.localeCompare(typeB))
         .map((sprite) => this._makeSubMenu(sprite));
   }

   private _makeSubMenu(sprite: Phaser.GameObjects.Sprite) {
      const type: SpriteType = sprite.getData('type');

      const spriteName = {
         [SpriteType.Character]: `[Player] ${sprite.name}`,
      }[type];

      const subMenu = {
         [SpriteType.Character]: this._makeCharacterMenu(sprite.name),
      }[type];

      return {
         text: spriteName,
         subMenu,
      };
   }

   private _makeCharacterMenu(characterName: string): SubMenuItem[] {
      const isCurrentCharacter = characterName === this._store.characterStore.name;

      return [
         {
            text: isCurrentCharacter ? 'Slap' : `Talk to ${characterName}`,
            callback: () => {
               if (isCurrentCharacter) {
                  this._store.colyseusStore.sendMessage(Channel.GENERAL, 'Ouch!');
                  this._store.chatStore.setInput('');
               } else {
                  this._store.chatStore.setInput(`/w ${characterName} `);

                  TimeMgt.wait(100).then(() => {
                     if (this._store.chatStore.inputRef !== null) {
                        this._store.chatStore.inputRef.focus();
                     }
                  });
               }
            },
         },
      ];
   }

   public setCurrentSubMenu(subMenu: SubMenuItem[]): void {
      this.currentSubMenu = [...subMenu];
   }
}
