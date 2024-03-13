import type { Position } from 'grid-engine';
import { makeAutoObservable } from 'mobx';
import { Player } from 'shared/src/types/Player';
import { ProfessionType } from 'shared/src/types/Profession';
import { Room } from 'shared/src/types/Room';

export class CharacterStore {
   public map: Room = 'AAA_InitialRoom';

   public name: string = '';

   public profession: ProfessionType = ProfessionType.Warrior;

   public position: Position = { x: 0, y: 0 };

   public players: Player[] = [];

   public talents: number[] = [];

   public talentsPoints: number = 0;

   constructor() {
      makeAutoObservable(this);
   }

   public setMap(map: Room) {
      this.map = map;
   }

   public setName(name: string) {
      this.name = name;
   }

   public setProfession(profession: ProfessionType) {
      this.profession = profession;
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

   public setTalents(talents: number[]) {
      this.talents = [...talents];
   }

   public setTalentsPoints(talentsPoints: number) {
      this.talentsPoints = talentsPoints;
   }
}
