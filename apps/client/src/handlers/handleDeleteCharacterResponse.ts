import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { _assertTrue } from 'shared/src/utils/_assert';
import { Store } from '../store/Store';

export const handleDeleteCharacterResponse = (
   { response }: ServerPacketType<'deleteCharacterResponse'>,
   store: Store,
) => {
   const { loginStore } = store;

   if (response.status === 'error') {
      loginStore.reset();
      loginStore.setErrorMessage(response.errorMessage);
      return;
   }

   _assertTrue(response.status === 'character_deleted', 'Unknown status');

   loginStore.reset();
   loginStore.setCharacters(response.characters);
   loginStore.setSuccessMessage('Character deleted');
};
