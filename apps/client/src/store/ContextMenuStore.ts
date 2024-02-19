import { makeAutoObservable } from 'mobx';
import { Channel } from 'shared/src/types/Channel';
import { TimeMgt } from 'shared/src/utils/timeMgt';
import { InteractiveObject } from '../game/Scene';
import { EntityType, InteractiveObjectType, zInteractiveObjectType } from '../utils/phaser';
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

   public interactiveObjects: InteractiveObject[] = [];

   public currentSubMenu: SubMenuItem[] = [];

   public currentSubMenuTitle: string = '';

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public openContextMenu(
      x: number,
      y: number,
      sprites: Phaser.GameObjects.Sprite[],
      interactiveObjects: InteractiveObject[],
   ): void {
      this.isOpened = true;
      this.positionX = x;
      this.positionY = y;
      this.sprites = [...sprites];
      this.interactiveObjects = [...interactiveObjects];
      this.currentSubMenu = [];
      this.currentSubMenuTitle = '';

      this.sprites.forEach((sprite) => {
         sprite.setData('hovered', false);
      });

      this.interactiveObjects.forEach(({ polygon }) => {
         polygon.setData('hovered', false);
      });
   }

   public closeContextMenu(): void {
      this.isOpened = false;
      this.positionX = 0;
      this.positionY = 0;
      this.sprites = [];
      this.interactiveObjects = [];
      this.currentSubMenu = [];
      this.currentSubMenuTitle = '';
   }

   public get menu(): MenuItem[] {
      const spritesMenuItems = this.sprites
         .slice()
         .sort(({ type: typeA }, { type: typeB }) => typeA.localeCompare(typeB))
         .map((sprite) => this._makeSpriteSubMenu(sprite));

      const interactiveObjectsMenuItems = this.interactiveObjects
         .map(({ polygon }) => polygon)
         .slice()
         .sort(({ name: typeA }, { name: typeB }) => typeA.localeCompare(typeB))
         .map((polygon) => this._makePolygonSubMenu(polygon));

      return [...spritesMenuItems, ...interactiveObjectsMenuItems];
   }

   private _makeSpriteSubMenu(sprite: Phaser.GameObjects.Sprite) {
      const type: EntityType = sprite.getData('type');

      const spriteName = {
         [EntityType.Character]: `[Player] ${sprite.name}`,
      }[type];

      const subMenu = {
         [EntityType.Character]: this._makeCharacterMenu(sprite.name),
      }[type];

      return {
         text: spriteName,
         subMenu,
      };
   }

   private _makePolygonSubMenu(polygon: Phaser.GameObjects.Polygon) {
      const type = zInteractiveObjectType.parse(polygon.name);

      const menuName = {
         [InteractiveObjectType.Teleporter]: '[Object] Teleporter',
      }[type];

      const subMenu = {
         [InteractiveObjectType.Teleporter]: this._makeTeleporterMenu(),
      }[type];

      return {
         text: menuName,
         subMenu,
      };
   }

   private _makeTeleporterMenu(): SubMenuItem[] {
      return [
         {
            text: 'Use',
            callback: () => {
               this._store.chatStore.addMessage({
                  author: 'System',
                  channel: Channel.ERROR,
                  content: 'Teleporting is not implemented yet >.>',
               });
            },
         },
      ];
   }

   private _makeCharacterMenu(characterName: string): SubMenuItem[] {
      const isCurrentCharacter = characterName === this._store.characterStore.name;

      return [
         {
            text: isCurrentCharacter ? 'Slap' : 'Send a message',
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

   public setCurrentSubMenu(title: string, subMenu: SubMenuItem[]): void {
      this.currentSubMenuTitle = title;
      this.currentSubMenu = [...subMenu];
   }
}
