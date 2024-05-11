import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';
import { NPCS, isNPC, zNPC } from 'shared/src/data/npcs';
import { Channel } from 'shared/src/types/Channel';
import { TimeMgt } from 'shared/src/utils/timeMgt';
import { InteractiveObject } from '../game/Scene';
import { npcsDialogs } from '../utils/npcsDialogs';
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
         [EntityType.Monster]: this._makeMonsterMenu(sprite),
      }[type];

      return {
         text: `[${i18next.t(type)}] ${i18next.t(sprite.name)}`,
         subMenu,
      };
   }

   private _makePolygonSubMenu(polygon: Phaser.GameObjects.Polygon) {
      const type = zInteractiveObjectType.parse(polygon.name);

      const subMenu = {
         [InteractiveObjectType.Teleporter]: this._makeTeleporterMenu(),
         [InteractiveObjectType.TeleporterCell]: [],
         [InteractiveObjectType.Bed]: this._makeBedMenu(),
         [InteractiveObjectType.Well]: this._makeWellMenu(),
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

   private _makeBedMenu(): SubMenuItem[] {
      return [
         {
            text: i18next.t('sleep'),
            callback: () => {
               console.log('sleep...');
            },
         },
      ];
   }

   private _makeWellMenu(): SubMenuItem[] {
      return [
         {
            text: i18next.t('gamble'),
            callback: () => {
               console.log('gamble...');
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
      const npcInfos = NPCS[parsedNpcName];
      const { name } = npcInfos;

      if (name === 'Akara') {
         return [
            {
               text: i18next.t('talk'),
               callback: () => {
                  this._store.dialogMenuStore.openDialog(
                     npcsDialogs[parsedNpcName](npcInfos, this._store, i18next.t),
                  );
               },
            },
         ];
      }

      if (name === 'Serge Dualé') {
         return [
            {
               text: i18next.t('talk'),
               callback: () => {
                  this._store.dialogMenuStore.openDialog(
                     npcsDialogs[parsedNpcName](npcInfos, this._store, i18next.t),
                  );
               },
            },
         ];
      }

      return [];
   }

   private _makeMonsterMenu(sprite: Phaser.GameObjects.Sprite): SubMenuItem[] {
      const id = String(sprite.getData('id'));
      const fightId = +sprite.getData('fightId');

      return [
         {
            text: i18next.t('attack'),
            callback: () => {
               this._store.colyseusStore.fightPvE(id, fightId);
            },
         },
      ];
   }

   public setCurrentSubMenu(title: string, subMenu: SubMenuItem[]): void {
      this.currentSubMenuTitle = title;
      this.currentSubMenu = [...subMenu];
   }
}
