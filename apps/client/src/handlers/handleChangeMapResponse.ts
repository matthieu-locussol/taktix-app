import { ChangeMapResponse } from 'shared';
import { Store } from '../store/Store';

export const handleChangeMapResponse = ({ players }: ChangeMapResponse, store: Store) => {
   store.gameStore.getCurrentScene?.deleteAllExternalPlayers();

   players.forEach(({ name, posX, posY }) => {
      store.gameStore.getCurrentScene?.addExternalPlayer(name, { x: posX, y: posY });
   });

   return null;
};
