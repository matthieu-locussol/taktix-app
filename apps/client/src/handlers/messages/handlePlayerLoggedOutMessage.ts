import { PlayerLoggedOutResponse } from 'shared';
import { PlayerLoggedOutMessage } from 'shared/src/client/schemas/messages/PlayerLoggedOutMessage';
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
