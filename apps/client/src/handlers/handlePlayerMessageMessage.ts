import { PlayerMessageMessage, PlayerMessageResponse } from 'shared';
import { store } from '../store';
import { Store } from '../store/Store';

export const handlePlayerMessageMessage = (
   { content, name }: PlayerMessageMessage,
   _store: Store,
): PlayerMessageResponse => {
   store.chatStore.addMessage({
      author: name,
      message: content,
   });

   return {
      type: 'playerMessageResponse',
   };
};
