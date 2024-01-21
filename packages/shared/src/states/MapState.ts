import { MapSchema, Schema, type } from '@colyseus/schema';
import { PlayerState } from './PlayerState';

export class MapState extends Schema {
   @type({ map: PlayerState })
   players = new MapSchema<PlayerState, string>();

   createPlayer(sessionId: string, name: string, x: number, y: number) {
      const player = new PlayerState(name, x, y);
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
}
