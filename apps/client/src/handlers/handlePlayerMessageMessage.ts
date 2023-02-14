import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { store } from '../store';
import { Store } from '../store/Store';

export const handlePlayerMessageMessage = (
   { content, name }: ServerPacketType<'playerMessage'>,
   _store: Store,
): null => {
   store.chatStore.addMessage({
      author: name,
      message: content,
   });

   return null;
};
