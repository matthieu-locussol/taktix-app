import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { match } from 'ts-pattern';
import { Store } from '../store/Store';

export const handleLoginResponse = (
   { response }: ServerPacketType<'loginResponse'>,
   store: Store,
) => {
   const { characterSelectionStore, loginStore, screenStore } = store;
   const { username } = loginStore;

   loginStore.reset();

   match(response)
      .with({ status: 'user_not_found' }, () => {
         loginStore.setErrorMessage(`Incorrect credentials for user "${username}"!`);
      })
      .with({ status: 'user_found' }, ({ characters }) => {
         characterSelectionStore.setCharacters(characters);
         screenStore.setScreen('characterSelection');
      })
      .exhaustive();
};
