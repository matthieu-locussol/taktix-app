import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../store';
import { GameLayout } from './layouts/GameLayout';
import { CharacterSelectionScreen } from './screens/CharacterSelectionScreen';
import { CreateCharacterScreen } from './screens/CreateCharacterScreen';
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

   if (!loginStore.loggedIn) {
      if (loginStore.mode === 'login' || loginStore.mode === 'register') {
         return <LoginScreen />;
      }

      if (loginStore.mode === 'characterSelection') {
         return <CharacterSelectionScreen />;
      }

      if (loginStore.mode === 'characterCreation') {
         return <CreateCharacterScreen />;
      }
   }

   return <GameLayout>{!sceneVisible ? <CircularProgress /> : <Box id="root-game" />}</GameLayout>;
});
