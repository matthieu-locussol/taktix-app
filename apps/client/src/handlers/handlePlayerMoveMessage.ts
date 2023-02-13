import { PlayerMoveResponse } from 'shared';
import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerMoveMessage = (
   { name, x, y }: Extract<ServerPacket, { type: 'playerMove' }>,
   store: Store,
): PlayerMoveResponse => {
   store.gameStore.getCurrentScene.moveExternalPlayer(name, x, y);

   return {
      type: 'playerMoveResponse',
   };
};
