import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { match } from 'ts-pattern';
import { Store } from '../store/Store';

export const handleLoginResponse = (
   { response }: ServerPacketType<'loginResponse'>,
   store: Store,
) => {
   const { characterSelectionStore, loginStore, screenStore } = store;
   loginStore.reset();

   match(response)
      .with({ status: 'error' }, ({ errorMessage }) => {
         loginStore.setErrorMessage(errorMessage);
      })
      .with({ status: 'success' }, ({ characters }) => {
         characterSelectionStore.setCharacters(characters.map(({ name }) => name));
         screenStore.setScreen('characterSelection');
      })
      .exhaustive();
};
