import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { _assertTrue } from 'shared/src/utils/_assert';
import { Store } from '../store/Store';

export const handleSelectCharacterResponse = (
   { response }: ServerPacketType<'selectCharacterResponse'>,
   store: Store,
) => {
   const { characterStore, loadingScreenStore, loginStore } = store;

   if (response.status === 'character_not_found') {
      loginStore.reset();
      loginStore.setErrorMessage(`User "${loginStore.username}" already exist!`);
      return;
   }

   if (response.status === 'wrong_user') {
      loginStore.reset();
      loginStore.setErrorMessage(`User "${loginStore.username}" not found!`);
      return;
   }

   _assertTrue(response.status === 'connected', 'Unknown status');

   loginStore.setLoggedIn(true);
   loginStore.setLoading(false);

   const scene = store.gameStore.changeMapPlayer(response.map, {
      entrancePosition: { x: response.posX, y: response.posY },
   });

   scene.gridEngine.setPosition(
      INTERNAL_PLAYER_NAME,
      { x: response.posX, y: response.posY },
      'player',
   );

   characterStore.setName(response.name);
   characterStore.setMap(response.map);
   characterStore.setPosition({ x: response.posX, y: response.posY });
   characterStore.setPlayers(response.players);

   loadingScreenStore.setSceneVisible(true);
};
