import { PlayerLoggedInMessage, PlayerLoggedInResponse } from 'shared';
import { store } from '../store';

export const handlePlayerLoggedInMessage = ({
   name,
}: PlayerLoggedInMessage): PlayerLoggedInResponse => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged in!`,
   });

   return {
      type: 'playerLoggedInResponse',
   };
};
