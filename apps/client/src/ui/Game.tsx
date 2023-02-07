import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Chatbox } from './Chatbox';
import { SocketDiv } from './SocketDiv';

export const Game = observer(() => {
   const {
      loadingScreenStore: { loadingAssets },
   } = useStore();

   if (loadingAssets) {
      return (
         <div style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
            <h1 style={{ color: 'white', zIndex: 999, textAlign: 'center', marginTop: '40vh' }}>
               Loading...
            </h1>
         </div>
      );
   }

   return (
      <Box>
         <Typography color="red">Server: {import.meta.env.VITE_SERVER_WEBSOCKET_URL}</Typography>
         <Chatbox />
         <Box id="root-game" />
         <SocketDiv />
      </Box>
   );
});
