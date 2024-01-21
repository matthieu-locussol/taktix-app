import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../store';
import { GameBackground } from './GameBackground';
import { GameLayout } from './layouts/GameLayout';
import { CharacterCreationScreen } from './screens/CharacterCreationScreen';
import { CharacterSelectionScreen } from './screens/CharacterSelectionScreen';
import { LoadingAssetsScreen } from './screens/LoadingAssetsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';

export const Game = observer(() => {
   const {
      colyseusStore,
      screenStore,
      loadingScreenStore: { loadingAssets, sceneVisible },
      updaterStore,
   } = useStore();

   useEffect(() => {
      updaterStore.checkUpdate();
   }, []);

   if (colyseusStore.changingMap) {
      return null;
   }

   if (loadingAssets) {
      return <LoadingAssetsScreen />;
   }

   if (!screenStore.loggedIn) {
      return (
         <React.Fragment>
            <GameBackground />
            {
               {
                  login: <LoginScreen />,
                  register: <RegisterScreen />,
                  characterSelection: <CharacterSelectionScreen />,
                  characterCreation: <CharacterCreationScreen />,
               }[screenStore.screen]
            }
         </React.Fragment>
      );
   }

   return <GameLayout>{!sceneVisible ? <CircularProgress /> : <Box id="root-game" />}</GameLayout>;
});
