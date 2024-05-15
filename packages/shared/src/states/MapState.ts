import { MapSchema, Schema, type } from '@colyseus/schema';
import { mapsFights } from '../data/mapsFights';
import { monsters } from '../data/monsters';
import { Room } from '../types/Room';
import { NumberMgt } from '../utils/numberMgt';
import { FightState } from './FightState';
import { PlayerState, PlayerStateConstructor } from './PlayerState';

export class MapState extends Schema {
   @type({ map: PlayerState })
   players = new MapSchema<PlayerState, string>();

   @type({ map: FightState })
   fights = new MapSchema<FightState, string>();

   createPlayer(sessionId: string, parameters: PlayerStateConstructor) {
      const player = new PlayerState(parameters);
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

   startFightsRegeneration(room: Room) {
      const mapFightData = mapsFights[room];
      if (mapFightData === null) {
         return;
      }

      this.generateAllFights(room);

      const { timeoutRegeneration } = mapFightData;
      setInterval(async () => {
         this.generateAllFights(room);
      }, timeoutRegeneration);
   }

   removeFight(id: string) {
      this.fights.delete(id);
   }

   private generateAllFights(room: Room) {
      while (this.generateFightsIfNeeded(room)) {
         console.log(`[MapRoom][${room}] Regenerating fights...`);
      }
   }

   private generateFightsIfNeeded(room: Room): boolean {
      const mapFightData = mapsFights[room];
      if (mapFightData === null) {
         return false;
      }

      const { fights, maxFights } = mapFightData;
      if (this.fights.size >= maxFights) {
         return false;
      }

      const eligibleFights = fights.filter(
         ({ positionX, positionY }) =>
            ![...this.fights.values()].some(
               (fight) => fight.positionX === positionX && fight.positionY === positionY,
            ),
      );

      if (eligibleFights.length === 0) {
         return false;
      }

      const randomFightIdx = NumberMgt.random(0, eligibleFights.length - 1);
      const randomFight = eligibleFights[randomFightIdx];
      if (randomFight === undefined) {
         return false;
      }

      const randomFightIdIdx = NumberMgt.random(0, randomFight.fightsIds.length - 1);
      const randomFightId = randomFight.fightsIds[randomFightIdIdx];

      const fight = new FightState(
         this.generateFightId(room, randomFightId),
         randomFightId,
         randomFight.name,
         randomFight.positionX,
         randomFight.positionY,
         randomFight.radius,
         monsters[randomFight.name]()({ level: 1 }).spritesheet,
      );

      this.fights.set(fight.id, fight);

      return true;
   }

   private generateFightId(room: Room, fightId: number): string {
      return `${room}_${fightId}_${this.fights.size}_${NumberMgt.random(
         0,
         Number.MAX_SAFE_INTEGER,
      )}`;
   }
}
