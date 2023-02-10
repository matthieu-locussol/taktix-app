import { PlayerMessageMessage } from 'shared/src/client/schemas/messages/PlayerMessageMessage';
import { PlayerMessageResponse } from 'shared/src/server/schemas/responses/PlayerMessageResponse';
import { store } from '../../store';

export const handlePlayerMessageMessage = ({
   data,
}: PlayerMessageMessage): PlayerMessageResponse => {
   store.chatStore.addMessage({
      author: data.name,
      message: data.content,
   });

   return {
      type: 'playerMessageResponse',
      data: null,
   };
};
