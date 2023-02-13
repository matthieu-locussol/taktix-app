import { PlayerMessageResponse } from 'shared';
import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { store } from '../store';
import { Store } from '../store/Store';

export const handlePlayerMessageMessage = (
   { content, name }: Extract<ServerPacket, { type: 'playerMessage' }>,
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
