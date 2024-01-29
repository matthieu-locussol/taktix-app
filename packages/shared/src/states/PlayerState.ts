import { Schema, type } from '@colyseus/schema';

export class PlayerState extends Schema {
   @type('string')
   name: string;

   @type('number')
   x: number;

   @type('number')
   y: number;

   @type('string')
   direction: string;

   @type('boolean')
   isMoving = false;

   constructor(name: string, x: number, y: number, direction: string) {
      super();

      this.name = name;
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
}
