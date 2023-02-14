import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerJoinMapMessage = (
   { name, x, y }: ServerPacketType<'playerJoinMap'>,
   store: Store,
): null => {
   store.gameStore.getCurrentScene.addExternalPlayer(name, { x, y });
   return null;
};
