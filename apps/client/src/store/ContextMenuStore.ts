import type { TranslationKey } from 'shared/src/data/translations.ts';
import type { InteractiveObjectPhaser } from '../game/Scene.ts';
import type { Store } from './Store.ts';

import { t } from 'i18next';
import { makeAutoObservable } from 'mobx';
import { INTERACTION_DRINK_WINE_COST } from 'shared/src/config.ts';
import { NPCS, isNPC, zNPC } from 'shared/src/data/npcs.ts';
import { Channel } from 'shared/src/types/Channel.ts';
import { zInteractiveObject } from 'shared/src/types/InteractiveObject.ts';
import { TimeMgt } from 'shared/src/utils/timeMgt.ts';

import { npcsDialogs } from '../utils/npcsDialogs.ts';
import { EntityType, moveToShape } from '../utils/phaser.ts';

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

   public interactiveObjects: InteractiveObjectPhaser[] = [];

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
      interactiveObjects: InteractiveObjectPhaser[],
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
         text: t(sprite.name),
         subMenu,
      };
   }

   private _makePolygonSubMenu(polygon: Phaser.GameObjects.Polygon) {
      const type = zInteractiveObject.parse(polygon.name);

      const subMenu = {
         Teleporter: this._makeTeleporterMenu(polygon),
         TeleporterCell: [],
         Bed: this._makeBedMenu(polygon),
         Well: this._makeWellMenu(polygon),
         WineBottle: this._makeWineBottleMenu(polygon),
         GraveyardLadder: this._makeGraveyardLadderMenu(polygon),
      }[type];

      return {
         text: t(type satisfies TranslationKey),
         subMenu,
      };
   }

   private _makeTeleporterMenu(polygon: Phaser.GameObjects.Polygon): SubMenuItem[] {
      return [
         {
            text: t('save' satisfies TranslationKey),
            callback: () => {
               moveToShape(this._store, polygon, () => {
                  this._store.colyseusStore.interact('SaveTeleporter');
               });
            },
            disabled: this._store.characterStore.teleporters.includes(
               this._store.characterStore.map,
            ),
         },
         {
            text: t('use' satisfies TranslationKey),
            callback: () => {
               moveToShape(this._store, polygon, () => {
                  this._store.mapMenuStore.open();
               });
            },
         },
      ];
   }

   private _makeBedMenu(polygon: Phaser.GameObjects.Polygon): SubMenuItem[] {
      return [
         {
            text: t('sleep' satisfies TranslationKey),
            callback: () => {
               moveToShape(this._store, polygon, () => {
                  this._store.colyseusStore.interact('Sleep');
               });
            },
         },
      ];
   }

   private _makeWellMenu(polygon: Phaser.GameObjects.Polygon): SubMenuItem[] {
      return [
         {
            text: t('gamble' satisfies TranslationKey),
            callback: () => {
               moveToShape(this._store, polygon, () => {
                  this._store.gatchaMenuStore.open();
               });
            },
         },
      ];
   }

   private _makeWineBottleMenu(polygon: Phaser.GameObjects.Polygon): SubMenuItem[] {
      return [
         {
            text: t('drinkWine' satisfies TranslationKey, {
               value: INTERACTION_DRINK_WINE_COST,
               type: t('credits' satisfies TranslationKey).toLocaleLowerCase(),
            }),
            callback: () => {
               moveToShape(this._store, polygon, () => {
                  this._store.colyseusStore.interact('DrinkWine');
               });
            },
         },
      ];
   }

   private _makeGraveyardLadderMenu(polygon: Phaser.GameObjects.Polygon): SubMenuItem[] {
      return [
         {
            text: t('use' satisfies TranslationKey),
            callback: () => {
               moveToShape(this._store, polygon, () => {
                  this._store.dialogMenuStore.openDialog([
                     {
                        name: t('developer' satisfies TranslationKey),
                        content: t('graveyardLadder_dialog' satisfies TranslationKey),
                     },
                  ]);
               });
            },
         },
      ];
   }

   private _makeCharacterMenu(characterName: string): SubMenuItem[] {
      const isCurrentCharacter = characterName === this._store.characterStore.name;

      return [
         {
            text: isCurrentCharacter
               ? t('slap' satisfies TranslationKey)
               : t('sendMessage' satisfies TranslationKey),
            callback: () => {
               if (isCurrentCharacter) {
                  this._store.colyseusStore.sendMessage(
                     Channel.GENERAL,
                     t('ouch' satisfies TranslationKey),
                  );
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

      if (name === 'Nono') {
         return [
            {
               text: t('talk' satisfies TranslationKey),
               callback: () => {
                  this._store.dialogMenuStore.openDialog(
                     npcsDialogs[parsedNpcName](npcInfos, this._store, t),
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
            text: t('fight' satisfies TranslationKey),
            callback: () => {
               moveToShape(this._store, sprite, () => {
                  this._store.colyseusStore.fightPvE(id, fightId);
               });
            },
         },
      ];
   }

   public setCurrentSubMenu(title: string, subMenu: SubMenuItem[]): void {
      this.currentSubMenuTitle = title;
      this.currentSubMenu = [...subMenu];
   }
}
