import { LoginResponse } from 'shared/src/client/schemas/responses/LoginResponse';
import { _assertTrue } from 'shared/src/utils/_assert';
import { store } from '../../store';
import { changeMapPlayer } from '../../utils/game';

export const handleLoginResponse = ({ data }: LoginResponse): void => {
   _assertTrue(data.response.status === 'connected');

   const { characterStore, loadingScreenStore } = store;

   const scene = changeMapPlayer(data.response.map, {
      entrancePosition: { x: data.response.posX, y: data.response.posY },
   });

   scene.gridEngine.setPosition(
      'player',
      { x: data.response.posX, y: data.response.posY },
      'player',
   );

   characterStore.setPosition({ x: data.response.posX, y: data.response.posY });
   loadingScreenStore.setSceneVisible(true);

   characterStore.setPlayers(data.response.players);
};
