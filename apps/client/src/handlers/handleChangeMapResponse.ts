import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handleChangeMapResponse = (
   { players }: ServerPacketType<'changeMapResponse'>,
   store: Store,
) => {
   store.gameStore.getCurrentScene?.deleteAllExternalPlayers();

   players.forEach(({ nickname, x, y }) => {
      store.gameStore.getCurrentScene?.addExternalPlayer(nickname, { x, y });
   });
};
