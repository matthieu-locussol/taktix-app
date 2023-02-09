import { PlayerLoggedOutMessage, PlayerLoggedOutResponse } from 'shared';
import { store } from '../../store';

export const handlePlayerLoggedOutMessage = ({
   data,
}: PlayerLoggedOutMessage): PlayerLoggedOutResponse => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${data.name} logged out :'(`,
   });

   return {
      type: 'playerLoggedOutResponse',
      data: null,
   };
};
