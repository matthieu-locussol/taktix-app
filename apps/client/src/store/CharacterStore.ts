import type { Position } from 'grid-engine';
import { makeAutoObservable } from 'mobx';

export class CharacterStore {
   public name: string = 'Jeckhys';

   public position: Position = { x: 0, y: 0 };

   constructor() {
      makeAutoObservable(this);
   }

   public setName(name: string) {
      this.name = name;
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
}
