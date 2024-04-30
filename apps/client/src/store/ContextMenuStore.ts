import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';
import { isNPC, zNPC } from 'shared/src/data/npcs';
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
   disabled?: boolean;
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

      const subMenu = {
         [EntityType.Character]: this._makeCharacterMenu(sprite.name),
         [EntityType.NPC]: this._makeNpcMenu(sprite.name),
      }[type];

      return {
         text: `[${i18next.t(type)}] ${sprite.name}`,
         subMenu,
      };
   }

   private _makePolygonSubMenu(polygon: Phaser.GameObjects.Polygon) {
      const type = zInteractiveObjectType.parse(polygon.name);

      const subMenu = {
         [InteractiveObjectType.Teleporter]: this._makeTeleporterMenu(),
         [InteractiveObjectType.TeleporterCell]: [],
      }[type];

      return {
         text: `[${i18next.t('object')}] ${i18next.t(type)}`,
         subMenu,
      };
   }

   private _makeTeleporterMenu(): SubMenuItem[] {
      return [
         {
            text: i18next.t('save'),
            callback: () => {
               this._store.colyseusStore.saveTeleporter(this._store.characterStore.map);
            },
            disabled: this._store.characterStore.teleporters.includes(
               this._store.characterStore.map,
            ),
         },
         {
            text: i18next.t('use'),
            callback: () => {
               this._store.mapMenuStore.open();
            },
         },
      ];
   }

   private _makeCharacterMenu(characterName: string): SubMenuItem[] {
      const isCurrentCharacter = characterName === this._store.characterStore.name;

      return [
         {
            text: isCurrentCharacter ? i18next.t('slap') : i18next.t('sendMessage'),
            callback: () => {
               if (isCurrentCharacter) {
                  this._store.colyseusStore.sendMessage(Channel.GENERAL, i18next.t('ouch'));
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

   private _makeNpcMenu(npcName: string): SubMenuItem[] {
      if (!isNPC(npcName)) {
         return [];
      }

      const parsedNpcName = zNPC.parse(npcName);

      if (parsedNpcName === 'Akara') {
         return [
            {
               text: i18next.t('startFight'),
               callback: () => {
                  this._store.colyseusStore.fightPvE(1);
               },
            },
         ];
      }

      if (parsedNpcName === 'Serge Dualé') {
         return [
            {
               text: i18next.t('talk'),
               callback: () => {
                  this._store.chatStore.setInput(`Talking to ${npcName}...`);

                  TimeMgt.wait(100).then(() => {
                     if (this._store.chatStore.inputRef !== null) {
                        this._store.chatStore.inputRef.focus();
                     }
                  });
               },
            },
         ];
      }

      return [];
   }

   public setCurrentSubMenu(title: string, subMenu: SubMenuItem[]): void {
      this.currentSubMenuTitle = title;
      this.currentSubMenu = [...subMenu];
   }
}
