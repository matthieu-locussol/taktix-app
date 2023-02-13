import { PlayerLeaveMapResponse } from 'shared';
import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLeaveMapMessage = (
   { name }: Extract<ServerPacket, { type: 'playerLeaveMap' }>,
   store: Store,
): PlayerLeaveMapResponse => {
   store.gameStore.getCurrentScene.deleteExternalPlayer(name);

   return {
      type: 'playerLeaveMapResponse',
   };
};
