import { LoginResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';
import { Store } from '../store/Store';

export const handleLoginResponse = ({ response }: LoginResponse, store: Store) => {
   _assertTrue(response.status === 'connected');

   const { characterStore, loadingScreenStore } = store;

   const scene = store.gameStore.changeMapPlayer(response.map, {
      entrancePosition: { x: response.posX, y: response.posY },
   });

   scene.gridEngine.setPosition('player', { x: response.posX, y: response.posY }, 'player');

   characterStore.setMap(response.map);
   characterStore.setPosition({ x: response.posX, y: response.posY });
   loadingScreenStore.setSceneVisible(true);

   characterStore.setPlayers(
      response.players.map((p) => ({
         nickname: p.name,
         position: { x: p.posX, y: p.posY },
      })),
   );

   return null;
};
