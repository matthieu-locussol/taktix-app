import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { match } from 'ts-pattern';
import { Store } from '../store/Store';

export const handleCreateCharacterResponse = (
   { response }: ServerPacketType<'createCharacterResponse'>,
   store: Store,
) => {
   const { characterCreationStore, characterSelectionStore, screenStore } = store;
   characterCreationStore.reset();

   match(response)
      .with({ status: 'error' }, ({ errorMessage }) => {
         characterCreationStore.setErrorMessage(errorMessage);
      })
      .with({ status: 'character_created' }, ({ characters }) => {
         characterCreationStore.reset();
         characterSelectionStore.setCharacters(characters);
         characterSelectionStore.setSuccessMessage('Character created!');

         screenStore.setScreen('characterSelection');
      })
      .exhaustive();
};
