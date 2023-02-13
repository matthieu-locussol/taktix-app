import { ClientPacketType } from 'shared/src/packets/ClientPacket';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLeaveMapMessage = (
   { name }: ServerPacketType<'playerLeaveMap'>,
   store: Store,
): ClientPacketType<'playerLeaveMapResponse'> => {
   store.gameStore.getCurrentScene.deleteExternalPlayer(name);

   return {
      type: 'playerLeaveMapResponse',
   };
};
