import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../store';
import { GameBackground } from './GameBackground';
import { GameLayout } from './layouts/GameLayout';
import { CharacterSelectionScreen } from './screens/CharacterSelectionScreen';
import { CreateCharacterScreen } from './screens/CreateCharacterScreen';
import { LoadingAssetsScreen } from './screens/LoadingAssetsScreen';
import { LoginScreen } from './screens/LoginScreen';

export const Game = observer(() => {
   const {
      screenStore,
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
      return (
         <React.Fragment>
            <GameBackground />
            {
               {
                  login: <LoginScreen />,
                  register: <LoginScreen />,
                  characterSelection: <CharacterSelectionScreen />,
                  characterCreation: <CreateCharacterScreen />,
               }[screenStore.screen]
            }
         </React.Fragment>
      );
   }

   return <GameLayout>{!sceneVisible ? <CircularProgress /> : <Box id="root-game" />}</GameLayout>;
});
