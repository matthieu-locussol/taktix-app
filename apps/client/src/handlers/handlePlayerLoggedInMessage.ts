import { PlayerLoggedInMessage, PlayerLoggedInResponse } from 'shared';
import { Store } from '../store/Store';

export const handlePlayerLoggedInMessage = (
   { name }: PlayerLoggedInMessage,
   store: Store,
): PlayerLoggedInResponse => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged in!`,
   });

   return {
      type: 'playerLoggedInResponse',
   };
};
