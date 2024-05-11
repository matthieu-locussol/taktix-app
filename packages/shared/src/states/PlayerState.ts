import { Schema, type } from '@colyseus/schema';
import { Item, ItemPosition } from '../types/Item';
import { Room } from '../types/Room';
import { WeaponDamages, WeaponType, isWeaponType, zWeaponType } from '../types/Weapon';

export class PlayerState extends Schema {
   @type('string')
   name: string;

   @type('string')
   spritesheet: string;

   @type('number')
   x: number;

   @type('number')
   y: number;

   @type('string')
   direction: string;

   @type('boolean')
   isMoving = false;

   @type('boolean')
   isFight = false;

   health = 0;

   fightTimestamp = 0;

   fightTurns = 0;

   teleporters: Room[] = [];

   items: Item[] = [];

   constructor(
      name: string,
      spritesheet: string,
      x: number,
      y: number,
      direction: string,
      teleporters: Room[],
   ) {
      super();

      this.name = name;
      this.spritesheet = spritesheet;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.teleporters = teleporters;
   }

   move(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.isMoving = true;
   }

   stopMoving(direction: string, x: number, y: number) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.isMoving = false;
   }

   startFight() {
      this.isFight = true;
      this.fightTimestamp = Date.now();
      this.fightTurns = 0;
   }

   stopFight() {
      this.isFight = false;
   }

   setFightTurns(turns: number) {
      this.fightTurns = turns;
   }

   setHealth(health: number) {
      this.health = health;
   }

   addItems(items: Item[]) {
      this.items = [...items, ...this.items];
   }

   equipItem(itemId: number) {
      const item = this.items.find((item) => item.id === itemId);

      if (item) {
         item.position = ItemPosition.Equipment;
      }
   }

   unequipItem(itemId: number) {
      const item = this.items.find((item) => item.id === itemId);

      if (item) {
         item.position = ItemPosition.Inventory;
      }
   }

   getEquippedItems() {
      return this.items.filter((item) => item.position === ItemPosition.Equipment);
   }

   getEquippedWeapon(): Item | undefined {
      const weapon = this.getEquippedItems().find((item) => isWeaponType(item.type));
      return weapon;
   }

   getEquippedWeaponType(): WeaponType | undefined {
      const weapon = this.getEquippedWeapon();

      if (weapon === undefined) {
         return undefined;
      }

      return zWeaponType.parse(weapon.type);
   }

   // TODO: better handling of weapon damages
   getEquippedWeaponDamages(): WeaponDamages[] {
      const weapons = this.getEquippedItems().filter((item) => isWeaponType(item.type));
      return weapons.flatMap((weapon) => weapon.damages);
   }
}
