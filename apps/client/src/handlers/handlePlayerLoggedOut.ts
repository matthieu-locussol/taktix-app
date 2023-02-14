import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLoggedOut = (
   { name }: ServerPacketType<'playerLoggedOut'>,
   store: Store,
) => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged out :'(`,
   });
};
