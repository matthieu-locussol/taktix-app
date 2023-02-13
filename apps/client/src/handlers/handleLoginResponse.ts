import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { _assertTrue } from 'shared/src/utils/_assert';
import { Store } from '../store/Store';

export const handleLoginResponse = (
   { response }: ServerPacketType<'loginResponse'>,
   store: Store,
) => {
   _assertTrue(response.status === 'connected');

   const { characterStore, loadingScreenStore } = store;

   const scene = store.gameStore.changeMapPlayer(response.map, {
      entrancePosition: { x: response.posX, y: response.posY },
   });

   scene.gridEngine.setPosition('player', { x: response.posX, y: response.posY }, 'player');

   characterStore.setMap(response.map);
   characterStore.setPosition({ x: response.posX, y: response.posY });
   loadingScreenStore.setSceneVisible(true);
   characterStore.setPlayers(response.players);

   return null;
};
