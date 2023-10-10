import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { match } from 'ts-pattern';
import { Store } from '../store/Store';

export const handleSelectCharacterResponse = (
   { response }: ServerPacketType<'selectCharacterResponse'>,
   store: Store,
) => {
   const { characterSelectionStore, characterStore, loadingScreenStore, loginStore, screenStore } =
      store;
   characterSelectionStore.reset();

   match(response)
      .with({ status: 'character_not_found' }, () => {
         characterSelectionStore.setErrorMessage(
            `Character "${characterSelectionStore.selectedCharacter}" does not exist!`,
         );
      })
      .with({ status: 'wrong_user' }, () => {
         characterSelectionStore.setErrorMessage(
            `Character "${characterSelectionStore.selectedCharacter}" does not belong to user "${loginStore.username}"!`,
         );
      })
      .with({ status: 'connected' }, ({ map, posX, posY, players }) => {
         screenStore.setLoggedIn(true);

         const scene = store.gameStore.changeMapPlayer(map, {
            entrancePosition: { x: posX, y: posY },
         });

         scene.gridEngine.setPosition(INTERNAL_PLAYER_NAME, { x: posX, y: posY }, 'player');

         characterStore.setName(characterSelectionStore.selectedCharacter);
         characterStore.setMap(map);
         characterStore.setPosition({ x: posX, y: posY });
         characterStore.setPlayers(players);

         loadingScreenStore.setSceneVisible(true);
      })
      .exhaustive();
};
