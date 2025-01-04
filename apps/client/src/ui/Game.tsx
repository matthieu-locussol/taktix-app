import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import { useStore } from '../store/index.tsx';

import { GameBackground } from './GameBackground.tsx';
import { GameLayout } from './layouts/GameLayout.tsx';
import { CharacterCreationScreen } from './screens/CharacterCreationScreen.tsx';
import { CharacterSelectionScreen } from './screens/CharacterSelectionScreen.tsx';
import { LoadingAssetsScreen } from './screens/LoadingAssetsScreen.tsx';
import { LoginScreen } from './screens/LoginScreen.tsx';
import { RegisterScreen } from './screens/RegisterScreen.tsx';

export const Game = observer(() => {
   const {
      colyseusStore,
      discordStore,
      screenStore,
      loadingScreenStore: { loadingAssets, sceneVisible },
      updaterStore,
   } = useStore();

   useEffect(() => {
      updaterStore.checkUpdate();
      discordStore.updateDiscordRichPresence();
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
