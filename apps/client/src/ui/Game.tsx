import { Box, CircularProgress, TextField, outlinedInputClasses } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { Chatbox } from './Chatbox';
import { LoadingScreen } from './LoadingScreen';
import { SocketDiv } from './SocketDiv';

export const Game = observer(() => {
   const [input, setInput] = useState('');
   const {
      loadingScreenStore: { loadingAssets, sceneVisible },
      chatStore,
      characterStore,
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

   if (characterStore.name === '') {
      return (
         <Box
            component="form"
            onSubmit={(e) => {
               e.preventDefault();
               characterStore.setName(input);
            }}
            sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100vw',
               height: '100vh',
            }}
         >
            <TextField
               label="Enter your name"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               sx={{
                  [`.${outlinedInputClasses.root}`]: {
                     backgroundColor: 'white',
                     minWidth: 280,
                  },
               }}
            />
         </Box>
      );
   }

   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
         }}
      >
         <Chatbox />
         {!sceneVisible ? <CircularProgress /> : <Box id="root-game" />}
         <SocketDiv />
      </Box>
   );
});
