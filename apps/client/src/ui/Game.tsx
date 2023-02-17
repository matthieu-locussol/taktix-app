import { Box, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../store';
import { GameLayout } from './layouts/GameLayout';
import { LoadingAssetsScreen } from './screens/LoadingAssetsScreen';
import { LoginScreen } from './screens/LoginScreen';

export const Game = observer(() => {
   const {
      loadingScreenStore: { loadingAssets, sceneVisible },
      characterStore,
      updaterStore,
   } = useStore();

   useEffect(() => {
      updaterStore.checkUpdate();
   }, []);

   if (loadingAssets) {
      return <LoadingAssetsScreen />;
   }

   if (characterStore.name === '') {
      return <LoginScreen />;
   }

   return <GameLayout>{!sceneVisible ? <CircularProgress /> : <Box id="root-game" />}</GameLayout>;
});
