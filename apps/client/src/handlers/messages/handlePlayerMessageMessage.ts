import { PlayerMessageMessage, PlayerMessageResponse } from 'shared';
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
