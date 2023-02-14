import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { store } from '../store';
import { Store } from '../store/Store';

export const handlePlayerLoggedOutMessage = (
   { name }: ServerPacketType<'playerLoggedOut'>,
   _store: Store,
): null => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged out :'(`,
   });

   return null;
};
