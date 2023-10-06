import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { Store } from '../store/Store';

export const handleLoginResponse = (
   { response }: ServerPacketType<'loginResponse'>,
   store: Store,
) => {
   const { characterStore, loadingScreenStore, loginStore } = store;

   if (response.status === 'user_already_exist') {
      loginStore.setErrorMessage(`User "${loginStore.username}" already exist!`);
      loginStore.resetFields();
      loginStore.setLoading(false);
      characterStore.setName('');
      return;
   }

   if (response.status === 'user_not_found') {
      loginStore.setErrorMessage(`User "${loginStore.username}" not found!`);
      loginStore.resetFields();
      loginStore.setLoading(false);
      characterStore.setName('');
      return;
   }

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
