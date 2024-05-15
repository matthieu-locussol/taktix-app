import { makeAutoObservable } from 'mobx';
import { WheelDataType } from 'react-custom-roulette';
import { Item, ItemRarity, rarities } from 'shared/src/types/Item';
import { ItemMgt } from 'shared/src/utils/itemMgt';
import { ITEM_RARITY_COLORS } from '../styles/appTheme';
import { Store } from './Store';

export class GatchaMenuStore {
   private _store: Store;

   private _item: Item | null = null;

   public isOpened: boolean = false;

   public spin: boolean = false;

   public loading: boolean = false;

   public gainedRarity: number = 0;

   public lootBonus: number = 80;

   public item: Item | null = null;

   public MIN_LOOT_BONUS = 50;

   public MAX_LOOT_BONUS = 500;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public setIsOpened(isOpened: boolean): void {
      this.isOpened = isOpened;
      this._store.soundsStore.play('check');
   }

   public open(): void {
      this.setIsOpened(true);
   }

   public close(): void {
      this.setIsOpened(false);

      this.gainedRarity = 0;
      this.item = null;
      this._item = null;
      this.lootBonus = this.MIN_LOOT_BONUS;

      this.stopSpin();
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }

   public start(): void {
      this.loading = true;

      this.item = null;
      this._item = null;

      this._store.colyseusStore.spinWheel();
   }

   public startSpin(item: Item): void {
      this.spin = true;
      this._item = item;
   }

   public showItem(): void {
      this.item = this._item;
   }

   public stopSpin(): void {
      this.spin = false;
      this.loading = false;

      this.showItem();
   }

   public setLootBonus(value: number): void {
      this.lootBonus = value;
   }

   public setGainedRarity(value: ItemRarity): void {
      this.gainedRarity = ItemMgt.RARITY_ORDER[value];
   }

   public get orderedRarities(): ItemRarity[] {
      return [...rarities].sort((a, b) => ItemMgt.RARITY_ORDER[b] - ItemMgt.RARITY_ORDER[a]);
   }

   public get canSpin(): boolean {
      return !this.loading && this._store.characterStore.gachix > 0;
   }

   public get wheelData(): WheelDataType[] {
      return rarities.map((rarity) => ({
         option: '',
         style: { backgroundColor: ITEM_RARITY_COLORS[rarity] },
         optionSize: 1,
      }));
   }
}
