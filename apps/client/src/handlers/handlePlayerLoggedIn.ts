import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLoggedIn = (
   { name }: ServerPacketType<'playerLoggedIn'>,
   store: Store,
) => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged in!`,
   });
};
