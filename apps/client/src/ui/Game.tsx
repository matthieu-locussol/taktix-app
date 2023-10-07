import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../store';
import { GameLayout } from './layouts/GameLayout';
import { CharacterSelectionScreen } from './screens/CharacterSelectionScreen';
import { LoadingAssetsScreen } from './screens/LoadingAssetsScreen';
import { LoginScreen } from './screens/LoginScreen';

export const Game = observer(() => {
   const {
      loadingScreenStore: { loadingAssets, sceneVisible },
      updaterStore,
      loginStore,
   } = useStore();

   useEffect(() => {
      updaterStore.checkUpdate();
   }, []);

   if (loadingAssets) {
      return <LoadingAssetsScreen />;
   }

   if (!loginStore.loggedIn && loginStore.mode !== 'characterSelection') {
      return <LoginScreen />;
   }

   if (!loginStore.loggedIn && loginStore.mode === 'characterSelection') {
      return <CharacterSelectionScreen />;
   }

   return <GameLayout>{!sceneVisible ? <CircularProgress /> : <Box id="root-game" />}</GameLayout>;
});
