import { PlayerLeaveMapMessage, PlayerLeaveMapResponse } from 'shared';
import { Store } from '../store/Store';

export const handlePlayerLeaveMapMessage = (
   { name }: PlayerLeaveMapMessage,
   store: Store,
): PlayerLeaveMapResponse => {
   store.gameStore.getCurrentScene.deleteExternalPlayer(name);

   return {
      type: 'playerLeaveMapResponse',
   };
};
