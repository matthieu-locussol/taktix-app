import { useEffect, useMemo } from 'react';
import { ClientPacket } from 'shared';
import { zServerPacket } from 'shared/src/client/ServerPacket';
import { handleServerMessage } from '../handlers/handleServerMessage';
import { handleServerResponse } from '../handlers/handleServerResponse';
import { store, useStore } from '../store';

export const SocketDiv = () => {
   const {
      characterStore: { name },
   } = useStore();

   const socket = useMemo(() => new WebSocket(import.meta.env.VITE_SERVER_WEBSOCKET_URL), []);

   useEffect(() => {
      store.socket = socket;
   }, []);

   socket.onopen = () => {
      const packet: ClientPacket = {
         type: 'message',
         packet: {
            type: 'login',
            data: {
               name,
            },
         },
      };

      socket.send(JSON.stringify(packet));
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
               console.log(`Sending a ${payload.packet.type} response...`);
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

   return <div />;
};
