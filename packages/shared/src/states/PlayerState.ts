import { Schema, type } from '@colyseus/schema';

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

   fightTimestamp = 0;

   fightTurns = 0;

   constructor(name: string, profession: string, x: number, y: number, direction: string) {
      super();

      this.name = name;
      this.profession = profession;
      this.x = x;
      this.y = y;
      this.direction = direction;
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
}
