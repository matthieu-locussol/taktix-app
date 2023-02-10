import { makeAutoObservable } from 'mobx';
import { ClientPacket } from 'shared/src/client/ClientPacket';
import { zServerPacket } from 'shared/src/server/ServerPacket';
import { handleServerMessage } from '../handlers/handleServerMessage';
import { handleServerResponse } from '../handlers/handleServerResponse';
import { CharacterStore } from './CharacterStore';
import { ChatStore } from './ChatStore';
import { LoadingScreenStore } from './LoadingScreenStore';

export class Store {
   socket: WebSocket | null = null;

   loadingScreenStore = new LoadingScreenStore();

   characterStore = new CharacterStore();

   chatStore = new ChatStore();

   constructor() {
      makeAutoObservable(this);
   }

   setSocket(socket: WebSocket) {
      this.socket = socket;

      socket.onopen = () => {
         const packet: ClientPacket = {
            type: 'message',
            packet: {
               type: 'login',
               data: {
                  name: this.characterStore.name,
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
   }
}
