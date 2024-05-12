import { logger } from '@colyseus/core';
import { INTERACTIVE_OBJECTS_MAP, TELEPORTATION_PLACES } from 'shared';
import { InteractionFn } from './InteractionFn';

export const saveTeleporterInteraction: InteractionFn = async (client, player, room) => {
   if (!INTERACTIVE_OBJECTS_MAP[room].Teleporter) {
      return false;
   }

   const place = TELEPORTATION_PLACES[room];
   if (place === undefined) {
      return false;
   }

   player.addTeleporter(room);
   logger.info(`[MapRoom][${room}] Client '${client.sessionId}' (${player.name}) saved teleporter`);
   return true;
};
