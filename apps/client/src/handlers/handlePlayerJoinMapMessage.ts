import { ClientPacketType } from 'shared/src/packets/ClientPacket';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerJoinMapMessage = (
   { name, x, y }: ServerPacketType<'playerJoinMap'>,
   store: Store,
): ClientPacketType<'playerJoinMapResponse'> => {
   store.gameStore.getCurrentScene.addExternalPlayer(name, { x, y });

   return {
      type: 'playerJoinMapResponse',
   };
};
