import { PlayerMoveMessage, PlayerMoveResponse } from 'shared';
import { Store } from '../store/Store';

export const handlePlayerMoveMessage = (
   { name, x, y }: PlayerMoveMessage,
   store: Store,
): PlayerMoveResponse => {
   store.gameStore.getCurrentScene.moveExternalPlayer(name, x, y);

   return {
      type: 'playerMoveResponse',
   };
};
