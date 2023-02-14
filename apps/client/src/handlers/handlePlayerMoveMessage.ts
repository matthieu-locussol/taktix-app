import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerMoveMessage = (
   { name, x, y }: ServerPacketType<'playerMove'>,
   store: Store,
): null => {
   store.gameStore.getCurrentScene.moveExternalPlayer(name, x, y);
   return null;
};
