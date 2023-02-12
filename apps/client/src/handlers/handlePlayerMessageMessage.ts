import { PlayerMessageMessage, PlayerMessageResponse } from 'shared';
import { store } from '../store';

export const handlePlayerMessageMessage = ({
   content,
   name,
}: PlayerMessageMessage): PlayerMessageResponse => {
   store.chatStore.addMessage({
      author: name,
      message: content,
   });

   return {
      type: 'playerMessageResponse',
   };
};
