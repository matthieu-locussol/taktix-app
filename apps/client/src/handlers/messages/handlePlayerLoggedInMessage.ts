import { PlayerLoggedInMessage } from 'shared/src/client/schemas/messages/PlayerLoggedInMessage';
import { PlayerLoggedInResponse } from 'shared/src/server/schemas/responses/PlayerLoggedInResponse';
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
