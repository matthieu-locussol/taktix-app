import { PlayerLoggedOutResponse } from 'shared';
import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { store } from '../store';
import { Store } from '../store/Store';

export const handlePlayerLoggedOutMessage = (
   { name }: Extract<ServerPacket, { type: 'playerLoggedOut' }>,
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
