import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLeaveMap = (
   { name }: ServerPacketType<'playerLeaveMap'>,
   store: Store,
) => {
   store.gameStore.getCurrentScene.deleteExternalPlayer(name);
};
