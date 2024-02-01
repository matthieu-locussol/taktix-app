import type { Position } from 'grid-engine';
import { makeAutoObservable } from 'mobx';
import { roomsNames } from 'shared/src/data/roomsNames';
import { Player } from 'shared/src/types/Player';

export class CharacterStore {
   private _map: string = '';

   public name: string = '';

   public position: Position = { x: 0, y: 0 };

   public players: Player[] = [];

   constructor() {
      makeAutoObservable(this);
   }

   public setMap(map: string) {
      this._map = map;
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

   get map() {
      return roomsNames[this._map as keyof typeof roomsNames];
   }
}
