import type { Position } from 'grid-engine';
import { makeAutoObservable } from 'mobx';

interface Player {
   nickname: string;
   position: Position;
}

export class CharacterStore {
   public map: string = '';

   public name: string = '';

   public position: Position = { x: 0, y: 0 };

   public players: Player[] = [];

   constructor() {
      makeAutoObservable(this);
   }

   public setMap(map: string) {
      this.map = map;
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

   public setPlayers(players: Player[]) {
      this.players = players;
   }
}
