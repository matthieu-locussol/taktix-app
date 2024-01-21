import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerMove = (_: ServerPacketType<'playerMove'>, _store: Store) => {
   // store.gameStore.getCurrentScene.moveExternalPlayer(name, x, y);
};
