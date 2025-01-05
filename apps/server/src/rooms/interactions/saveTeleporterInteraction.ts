import type { InteractionFn } from './InteractionFn.ts';

import { logger } from '@colyseus/core';
import { INTERACTIVE_OBJECTS_MAP } from 'shared/src/data/interactiveObjects.ts';
import { TELEPORTATION_PLACES } from 'shared/src/data/teleportationPlaces.ts';

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
