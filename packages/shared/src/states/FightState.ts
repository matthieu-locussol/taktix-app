import { Schema, type } from '@colyseus/schema';

export class FightState extends Schema {
   @type('string')
   id: string;

   @type('number')
   fightId: number;

   @type('string')
   name: string;

   @type('number')
   positionX: number;

   @type('number')
   positionY: number;

   @type('number')
   radius: number;

   @type('string')
   spritesheet: string;

   constructor(
      id: string,
      fightId: number,
      name: string,
      positionX: number,
      positionY: number,
      radius: number,
      spritesheet: string,
   ) {
      super();

      this.id = id;
      this.fightId = fightId;
      this.name = name;
      this.positionX = positionX;
      this.positionY = positionY;
      this.radius = radius;
      this.spritesheet = spritesheet;
   }
}
