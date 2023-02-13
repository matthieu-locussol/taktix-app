import { PlayerJoinMapMessage, PlayerJoinMapResponse } from 'shared';
import { Store } from '../store/Store';

export const handlePlayerJoinMapMessage = (
   { name, x, y }: PlayerJoinMapMessage,
   store: Store,
): PlayerJoinMapResponse => {
   store.gameStore.getCurrentScene.addExternalPlayer(name, { x, y });

   return {
      type: 'playerJoinMapResponse',
   };
};
