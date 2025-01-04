import type { InteractionFn } from './InteractionFn.ts';

import { logger } from '@colyseus/core';
import { INTERACTIVE_OBJECTS_MAP } from 'shared';

export const sleepInteraction: InteractionFn = async (client, player, room) => {
   if (!INTERACTIVE_OBJECTS_MAP[room].Bed) {
      return false;
   }

   player.setHealthAtMax();
   logger.info(`[MapRoom][${room}] Client '${client.sessionId}' (${player.name}) slept`);

   return true;
};
