import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerMessage = (
   { content, name }: ServerPacketType<'playerMessage'>,
   store: Store,
) => {
   store.chatStore.addMessage({
      author: name,
      message: content,
   });
};
