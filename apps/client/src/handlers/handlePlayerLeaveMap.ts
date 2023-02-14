import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLeaveMap = (
   { name }: ServerPacketType<'playerLeaveMap'>,
   store: Store,
): null => {
   store.gameStore.getCurrentScene.deleteExternalPlayer(name);
   return null;
};