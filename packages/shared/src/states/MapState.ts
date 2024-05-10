import { MapSchema, Schema, type } from '@colyseus/schema';
import { Room } from '../types/Room';
import { PlayerState } from './PlayerState';

export class MapState extends Schema {
   @type({ map: PlayerState })
   players = new MapSchema<PlayerState, string>();

   createPlayer(
      sessionId: string,
      name: string,
      spritesheet: string,
      x: number,
      y: number,
      direction: string,
      teleporters: Room[],
   ) {
      const player = new PlayerState(name, spritesheet, x, y, direction, teleporters);
      this.players.set(sessionId, player);
   }

   removePlayer(sessionId: string) {
      this.players.delete(sessionId);
   }

   movePlayer(sessionId: string, x: number, y: number) {
      const player = this.players.get(sessionId);

      if (player !== undefined) {
         player.move(x, y);
      }
   }

   startFight(sessionId: string) {
      const player = this.players.get(sessionId);

      if (player !== undefined) {
         player.startFight();
      }
   }

   stopFight(sessionId: string) {
      const player = this.players.get(sessionId);

      if (player !== undefined) {
         player.stopFight();
      }
   }

   setFightTurns(sessionId: string, turns: number) {
      const player = this.players.get(sessionId);

      if (player !== undefined) {
         player.setFightTurns(turns);
      }
   }
}
