import { LoginResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';
import { store } from '../../store';
import { getCurrentScene } from '../../utils/game';

export const handleLoginResponse = ({ data }: LoginResponse): void => {
   _assertTrue(data.response.status === 'connected');

   const scene = getCurrentScene();
   scene.gridEngine.setPosition(
      'player',
      { x: data.response.posX, y: data.response.posY },
      'player',
   );

   const { characterStore, loadingScreenStore } = store;
   characterStore.setPosition({ x: data.response.posX, y: data.response.posY });
   loadingScreenStore.setSceneVisible(true);

   scene.sys.setVisible(true);
   scene.cameras.main.fadeIn(1000, 0, 0, 0);
};
