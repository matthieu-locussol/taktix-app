import { Schema, type } from '@colyseus/schema';

export class PlayerState extends Schema {
   @type('string')
   name: string;

   @type('number')
   x: number;

   @type('number')
   y: number;

   constructor(name: string, x: number, y: number) {
      super();

      this.name = name;
      this.x = x;
      this.y = y;
   }

   move(x: number, y: number) {
      this.x = x;
      this.y = y;
   }
}
