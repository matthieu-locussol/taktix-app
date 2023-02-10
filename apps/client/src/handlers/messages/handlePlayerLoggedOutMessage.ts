import { PlayerLoggedOutMessage } from 'shared/src/client/schemas/messages/PlayerLoggedOutMessage';
import { PlayerLoggedOutResponse } from 'shared/src/server/schemas/responses/PlayerLoggedOutResponse';
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
