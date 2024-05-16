import { logger } from '@colyseus/core';
import { INTERACTION_DRINK_WINE_COST, INTERACTIVE_OBJECTS_MAP } from 'shared';
import { InteractionFn } from './InteractionFn';

export const drinkWineInteraction: InteractionFn = async (client, player, room) => {
   if (!INTERACTIVE_OBJECTS_MAP[room].WineBottle) {
      return false;
   }

   if (player.money < INTERACTION_DRINK_WINE_COST) {
      return false;
   }

   player.setHealthAtMax();
   player.setMoney(player.money - INTERACTION_DRINK_WINE_COST);

   logger.info(`[MapRoom][${room}] Client '${client.sessionId}' (${player.name}) drank wine`);
   return true;
};
