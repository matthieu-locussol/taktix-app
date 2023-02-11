import { makeAutoObservable } from 'mobx';
import { ClientPacket, isClientPacket } from 'shared/src/packets/ClientPacket';
import { zServerPacket } from 'shared/src/packets/ServerPacket';
import { _assertTrue } from 'shared/src/utils/_assert';
import { handleServerPacket } from '../handlers/handleServerPacket';
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
            type: 'login',
            name: this.characterStore.name,
         };

         socket.send(JSON.stringify(packet));
      };

      socket.onmessage = (event) => {
         try {
            const packet = zServerPacket.parse(JSON.parse(event.data.toString()));
            const response = handleServerPacket(packet);

            if (response !== null) {
               _assertTrue(isClientPacket(response));
               console.log(`Sending a ${response.type} packet...`);
               socket.send(JSON.stringify(response));
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
