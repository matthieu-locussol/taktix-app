import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLoggedInMessage = (
   { name }: ServerPacketType<'playerLoggedIn'>,
   store: Store,
): null => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged in!`,
   });

   return null;
};
