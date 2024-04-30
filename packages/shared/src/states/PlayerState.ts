import { Schema, type } from '@colyseus/schema';
import { DEFAULT_HEALTH_REGEN_MS } from '../config';
import { Room } from '../types/Room';

export class PlayerState extends Schema {
   @type('string')
   name: string;

   @type('string')
   profession: string;

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

   maxHealth = 0;

   healthTimestamp = 0;

   fightTimestamp = 0;

   fightTurns = 0;

   teleporters: Room[] = [];

   constructor(
      name: string,
      profession: string,
      x: number,
      y: number,
      direction: string,
      health: number,
      teleporters: Room[],
   ) {
      super();

      this.name = name;
      this.profession = profession;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.teleporters = teleporters;

      this.setHealth(health);
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
      this.healthTimestamp = Date.now();
   }

   setFightTurns(turns: number) {
      this.fightTurns = turns;
   }

   setHealth(health: number) {
      this.health = health;
      this.healthTimestamp = Date.now();
   }

   setMaxHealth(maxHealth: number) {
      this.maxHealth = maxHealth;
   }

   getHealth() {
      const diff = Math.floor(Date.now() - this.healthTimestamp);
      return Math.floor(Math.min(this.health + diff / DEFAULT_HEALTH_REGEN_MS, this.maxHealth));
   }
}
