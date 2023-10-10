import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { match } from 'ts-pattern';
import { Store } from '../store/Store';

export const handleDeleteCharacterResponse = (
   { response }: ServerPacketType<'deleteCharacterResponse'>,
   store: Store,
) => {
   const { characterSelectionStore } = store;
   characterSelectionStore.reset();

   match(response)
      .with({ status: 'error' }, ({ errorMessage }) => {
         characterSelectionStore.setErrorMessage(errorMessage);
      })
      .with({ status: 'success' }, ({ characters }) => {
         characterSelectionStore.setCharacters(characters);
         characterSelectionStore.setSuccessMessage('Character deleted');
      })
      .exhaustive();
};
