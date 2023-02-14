import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerMove = ({ name, x, y }: ServerPacketType<'playerMove'>, store: Store) => {
   store.gameStore.getCurrentScene.moveExternalPlayer(name, x, y);
};
