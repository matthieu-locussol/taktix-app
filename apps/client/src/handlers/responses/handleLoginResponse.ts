import { LoginResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';
import { store } from '../../store';
import { getCurrentScene } from '../../utils/game';

export const handleLoginResponse = ({ data }: LoginResponse): void => {
   _assertTrue(data.response.status === 'connected');

   const scene = getCurrentScene();
   scene.gridEngine.setPosition('player', { x: data.response.posX, y: data.response.posY });

   const { characterStore, loadingScreenStore } = store;
   characterStore.setPosition({ x: data.response.posX, y: data.response.posY });
   loadingScreenStore.setLoadingAssets(false);
};
