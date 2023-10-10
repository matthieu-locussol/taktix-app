import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { _assertTrue } from 'shared/src/utils/_assert';
import { Store } from '../store/Store';

export const handleLoginResponse = (
   { response }: ServerPacketType<'loginResponse'>,
   store: Store,
) => {
   const { loginStore, screenStore } = store;

   if (response.status === 'user_already_exist') {
      loginStore.reset();
      loginStore.setErrorMessage(`User "${loginStore.username}" already exist!`);
      return;
   }

   if (response.status === 'user_not_found') {
      loginStore.reset();
      loginStore.setErrorMessage(`User "${loginStore.username}" not found!`);
      return;
   }

   _assertTrue(response.status === 'user_found', 'Unknown status');

   loginStore.reset();
   loginStore.setCharacters(response.characters);

   screenStore.setScreen('characterSelection');
};
