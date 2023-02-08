import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../store';
import { Chatbox } from './Chatbox';
import { LoadingScreen } from './LoadingScreen';
import { SocketDiv } from './SocketDiv';

export const Game = observer(() => {
   const {
      loadingScreenStore: { loadingAssets },
      chatStore,
   } = useStore();

   useEffect(() => {
      chatStore.addMessage({
         author: 'Server',
         message: `Connected to server ${import.meta.env.VITE_SERVER_WEBSOCKET_URL}!`,
      });
   }, []);

   if (loadingAssets) {
      return <LoadingScreen />;
   }

   return (
      <Box>
         <Chatbox />
         <Box id="root-game" />
         <SocketDiv />
      </Box>
   );
});
