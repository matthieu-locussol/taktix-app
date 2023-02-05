import { PlayerLoggedInMessage, PlayerLoggedInResponse } from 'shared';
import { store } from '../../store';

export const handlePlayerLoggedInMessage = ({
   data,
}: PlayerLoggedInMessage): PlayerLoggedInResponse => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${data.name} logged in!`,
   });

   return {
      type: 'playerLoggedInResponse',
      data: null,
   };
};
