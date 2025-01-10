import type { Scene } from '../game/Scene';

import { CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { EventBus } from '../game/EventBus';
import { useStore } from '../store/index';

import { GameContainer } from './GameContainer';
import { GameLayout } from './layouts/GameLayout';
import { CharacterCreationScreen } from './screens/CharacterCreationScreen';
import { CharacterSelectionScreen } from './screens/CharacterSelectionScreen';
import { LoadingAssetsScreen } from './screens/LoadingAssetsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';

export const Game = observer(() => {
   const {
      colyseusStore,
      discordStore,
      gameStore,
      screenStore,
      loadingScreenStore: { loadingAssets, sceneVisible },
      updaterStore,
   } = useStore();

   useEffect(() => {
      updaterStore.checkUpdate();
      discordStore.updateDiscordRichPresence();

      EventBus.on('current-scene-ready', (sceneInstance: Scene) => {
         gameStore.setCurrentScene(sceneInstance);
      });
   }, []);

   if (colyseusStore.changingMap) {
      return null;
   }

   if (loadingAssets) {
      return <LoadingAssetsScreen />;
   }

   if (!screenStore.loggedIn) {
      return {
         login: <LoginScreen />,
         register: <RegisterScreen />,
         characterSelection: <CharacterSelectionScreen />,
         characterCreation: <CharacterCreationScreen />,
      }[screenStore.screen];
   }

   return <GameLayout>{!sceneVisible ? <CircularProgress /> : <GameContainer />}</GameLayout>;
});
