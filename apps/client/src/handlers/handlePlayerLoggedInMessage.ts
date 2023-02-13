import { ClientPacketType } from 'shared/src/packets/ClientPacket';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLoggedInMessage = (
   { name }: ServerPacketType<'playerLoggedIn'>,
   store: Store,
): ClientPacketType<'playerLoggedInResponse'> => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged in!`,
   });

   return {
      type: 'playerLoggedInResponse',
   };
};
