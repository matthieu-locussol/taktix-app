import type { Position } from 'grid-engine';
import { makeAutoObservable, runInAction } from 'mobx';
import { DEFAULT_HEALTH_REGEN_MS } from 'shared/src/config';
import { LEVEL_TO_EXPERIENCE } from 'shared/src/data/levels';
import { Item, ItemPosition } from 'shared/src/types/Item';
import { Player } from 'shared/src/types/Player';
import { ProfessionType } from 'shared/src/types/Profession';
import { Room } from 'shared/src/types/Room';
import { Statistics } from 'shared/src/types/Statistic';
import { ItemMgt } from 'shared/src/utils/itemMgt';
import { LevelMgt } from 'shared/src/utils/levelMgt';
import { StatisticMgt } from 'shared/src/utils/statisticMgt';
import { Store } from './Store';

export class CharacterStore {
   private _store: Store;

   public map: Room = 'AAA_InitialRoom';

   public name: string = '';

   public profession: ProfessionType = ProfessionType.Warrior;

   public position: Position = { x: 0, y: 0 };

   public players: Player[] = [];

   public talents: number[] = [];

   public talentsPoints: number = 0;

   public baseStatistics: Statistics = StatisticMgt.makeMockedStatistics({});

   public baseStatisticsPoints: number = 0;

   public experience: number = 0;

   public currentHealth: number = 0;

   public teleporters: Room[] = [];

   public money: number = 0;

   public items: Item[] = [];

   private _intervalTimeout: NodeJS.Timeout | null = null;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public setMap(map: Room) {
      this.map = map;
   }

   public setName(name: string) {
      this.name = name;
   }

   public setProfession(profession: ProfessionType) {
      this.profession = profession;
   }

   public setPosition(position: Position) {
      this.position = position;
   }

   public setPositionX(x: number) {
      this.position.x = x;
   }

   public setPositionY(y: number) {
      this.position.y = y;
   }

   public setTalents(talents: number[]) {
      this.talents = [...talents];
   }

   public setTalentsPoints(talentsPoints: number) {
      this.talentsPoints = talentsPoints;
   }

   public setBaseStatistics(baseStatistics: Statistics) {
      this.baseStatistics = { ...baseStatistics };
   }

   public setBaseStatisticsPoints(baseStatisticsPoints: number) {
      this.baseStatisticsPoints = baseStatisticsPoints;
   }

   public setExperience(experience: number) {
      this.experience = experience;
      this.regenLifeIfNeeded();
   }

   public setCurrentHealth(currentHealth: number) {
      this.currentHealth = currentHealth;
      this.regenLifeIfNeeded();
   }

   public setTeleporters(teleporters: Room[]) {
      this.teleporters = [...teleporters];
   }

   public setMoney(money: number) {
      this.money = money;
   }

   public setItems(items: Item[]) {
      this.items = [...items];
   }

   public get healthPercentage() {
      return (this.currentHealth / this.maxHealth) * 100;
   }

   public get maxHealth() {
      return StatisticMgt.computeVitality(this.statistics);
   }

   public get experiencePercentage() {
      return (
         ((this.experience - this.minExperience) / (this.maxExperience - this.minExperience)) * 100
      );
   }

   public get remainingExperience() {
      return this.maxExperience - this.experience;
   }

   public get minExperience() {
      return LEVEL_TO_EXPERIENCE[this.level];
   }

   public get maxExperience() {
      return LEVEL_TO_EXPERIENCE[this.level + 1];
   }

   public get level() {
      return LevelMgt.getLevel(this.experience);
   }

   public get statistics(): Statistics {
      return StatisticMgt.aggregateStatistics(
         this.baseStatistics,
         this.experience,
         this.profession,
         this.talents,
         this.equippedItems,
      );
   }

   public get inventoryItems() {
      return this.items.filter((item) => item.position === ItemPosition.Inventory);
   }

   public get equippedItems() {
      return this.items.filter((item) => item.position === ItemPosition.Equipment);
   }

   public get equippedItemsTypes() {
      return this.equippedItems.map((item) => item.type);
   }

   public addItems(items: Item[]) {
      this.items = [...items, ...this.items];
   }

   public equipItem(id: number) {
      this._store.colyseusStore.equipItem(id);

      const item = this.items.find((item) => item.id === id);
      if (item !== undefined) {
         this._replaceItem(item);
      }
   }

   public unequipItem(id?: number) {
      if (id === undefined) {
         return;
      }

      this._store.colyseusStore.unequipItem(id);

      const item = this.items.find((item) => item.id === id);
      if (item !== undefined) {
         this.items = [
            {
               ...item,
               position: ItemPosition.Inventory,
            },
            ...this.items.filter((i) => i.id !== id),
         ];
      }
   }

   public get equippedItemsMap() {
      return ItemMgt.getEquippedItemsMap(this.equippedItems);
   }

   private _replaceItem(item: Item) {
      const { itemsToRemove, canEquip } = ItemMgt.itemsToRemoveAfterEquip(item, this.equippedItems);

      for (const id of itemsToRemove) {
         const replacedItem = this.items.find((item) => item.id === id);

         if (replacedItem !== undefined) {
            this.items = [
               { ...replacedItem, position: ItemPosition.Inventory },
               ...this.items.filter((i) => i.id !== id),
            ];
         }
      }

      if (canEquip) {
         this._equipItem(item);
      }
   }

   private _equipItem(item: Item) {
      if (this._store.characterStore.level >= item.requiredLevel) {
         this.items = [
            { ...item, position: ItemPosition.Equipment },
            ...this.items.filter((i) => i.id !== item.id),
         ];
      }
   }

   private regenLifeIfNeeded() {
      if (this._intervalTimeout) {
         return;
      }

      this._intervalTimeout = setInterval(() => {
         if (this._store.pveFightStore.fightOngoing) {
            if (this._intervalTimeout) {
               clearInterval(this._intervalTimeout);
               this._intervalTimeout = null;
            }
         } else {
            runInAction(() => {
               this.currentHealth = Math.min(this.currentHealth + 1, this.maxHealth);
            });

            if (this.currentHealth === this.maxHealth) {
               if (this._intervalTimeout) {
                  clearInterval(this._intervalTimeout);
                  this._intervalTimeout = null;
               }
            }
         }
      }, DEFAULT_HEALTH_REGEN_MS);
   }
}
