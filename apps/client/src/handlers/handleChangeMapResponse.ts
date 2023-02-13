import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handleChangeMapResponse = (
   { players }: Extract<ServerPacket, { type: 'changeMapResponse' }>,
   store: Store,
) => {
   store.gameStore.getCurrentScene?.deleteAllExternalPlayers();

   players.forEach(({ name, posX, posY }) => {
      store.gameStore.getCurrentScene?.addExternalPlayer(name, { x: posX, y: posY });
   });

   return null;
};
