import { PlayerLoggedInResponse } from 'shared';
import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handlePlayerLoggedInMessage = (
   { name }: Extract<ServerPacket, { type: 'playerLoggedIn' }>,
   store: Store,
): PlayerLoggedInResponse => {
   store.chatStore.addMessage({
      author: 'Server',
      message: `${name} logged in!`,
   });

   return {
      type: 'playerLoggedInResponse',
   };
};
