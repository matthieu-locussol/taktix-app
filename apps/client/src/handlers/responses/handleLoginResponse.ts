import { LoginResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';
import { store } from '../../store';
import { changeMapPlayer } from '../../utils/game';

export const handleLoginResponse = ({ response }: LoginResponse): void => {
   _assertTrue(response.status === 'connected');

   const { characterStore, loadingScreenStore } = store;

   const scene = changeMapPlayer(response.map, {
      entrancePosition: { x: response.posX, y: response.posY },
   });

   scene.gridEngine.setPosition('player', { x: response.posX, y: response.posY }, 'player');

   characterStore.setPosition({ x: response.posX, y: response.posY });
   loadingScreenStore.setSceneVisible(true);

   characterStore.setPlayers(response.players);
};
