import { PlayerLoggedOutResponse } from 'shared';
import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { store } from '../store';
import { Store } from '../store/Store';

export const handlePlayerLoggedOutMessage = (
   { name }: ServerPacketType<'playerLoggedOut'>,
   _store: Store,
): PlayerLoggedOutResponse => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged out :'(`,
   });

   return {
      type: 'playerLoggedOutResponse',
   };
};
