import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { ClientPacket } from 'shared';
import { zServerPacket } from 'shared/src/client/ServerPacket';
import { handleServerMessage } from '../handlers/handleServerMessage';
import { handleServerResponse } from '../handlers/handleServerResponse';
import { useStore } from '../store';
import { Chatbox } from './Chatbox';

export const Game = observer(() => {
   const {
      loadingScreenStore: { loadingAssets },
   } = useStore();

   const socket = useMemo(() => new WebSocket('ws://localhost:4000/ws'), []);

   socket.onopen = () => {
      console.log('Connected to the server!');
   };

   socket.onmessage = (event) => {
      try {
         const { type, packet } = zServerPacket.parse(JSON.parse(event.data.toString()));

         switch (type) {
            case 'message': {
               const response = handleServerMessage(packet);
               const payload: ClientPacket = {
                  type: 'response',
                  packet: response,
               };
               socket.send(JSON.stringify(payload));
               break;
            }
            case 'response': {
               handleServerResponse(packet);
               break;
            }
            default:
               throw new Error(`Unknown ServerPacket type: "${type}"`);
         }
      } catch (e) {
         console.error(e);
      }
   };

   socket.onerror = (error) => {
      console.error(error);
   };

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
         <Chatbox />
         <Box id="root-game" />
      </Box>
   );
});
