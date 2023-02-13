import { PlayerLoggedOutMessage, PlayerLoggedOutResponse } from 'shared';
import { store } from '../store';
import { Store } from '../store/Store';

export const handlePlayerLoggedOutMessage = (
   { name }: PlayerLoggedOutMessage,
   _store: Store,
): PlayerLoggedOutResponse => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged out :'(`,
   });

   return {
      type: 'playerLoggedOutResponse',
   };
};
