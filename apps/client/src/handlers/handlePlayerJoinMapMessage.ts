import { PlayerJoinMapResponse } from 'shared';
import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerJoinMapMessage = (
   { name, x, y }: Extract<ServerPacket, { type: 'playerJoinMap' }>,
   store: Store,
): PlayerJoinMapResponse => {
   store.gameStore.getCurrentScene.addExternalPlayer(name, { x, y });

   return {
      type: 'playerJoinMapResponse',
   };
};
