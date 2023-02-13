import { ClientPacketType } from 'shared/src/packets/ClientPacket';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerMoveMessage = (
   { name, x, y }: ServerPacketType<'playerMove'>,
   store: Store,
): ClientPacketType<'playerMoveResponse'> => {
   store.gameStore.getCurrentScene.moveExternalPlayer(name, x, y);

   return {
      type: 'playerMoveResponse',
   };
};
