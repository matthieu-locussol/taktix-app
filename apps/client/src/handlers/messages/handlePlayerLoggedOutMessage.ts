import { PlayerLoggedOutMessage, PlayerLoggedOutResponse } from 'shared';
import { store } from '../../store';

export const handlePlayerLoggedOutMessage = ({
   name,
}: PlayerLoggedOutMessage): PlayerLoggedOutResponse => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged out :'(`,
   });

   return {
      type: 'playerLoggedOutResponse',
   };
};
