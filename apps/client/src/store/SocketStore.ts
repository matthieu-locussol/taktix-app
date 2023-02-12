import { makeAutoObservable } from 'mobx';
import { ClientPacket, isClientPacket } from 'shared/src/packets/ClientPacket';
import { ServerPacket, zServerPacket } from 'shared/src/packets/ServerPacket';
import { _assertTrue } from 'shared/src/utils/_assert';
import { match } from 'ts-pattern';
import { handleChangeMapResponse } from '../handlers/packets/handleChangeMapResponse';
import { handleLoginResponse } from '../handlers/packets/handleLoginResponse';
import { handleLogoutResponse } from '../handlers/packets/handleLogoutResponse';
import { handleMessageResponse } from '../handlers/packets/handleMessageResponse';
import { handleMoveResponse } from '../handlers/packets/handleMoveResponse';
import { handlePlayerJoinMapMessage } from '../handlers/packets/handlePlayerJoinMapMessage';
import { handlePlayerLeaveMapMessage } from '../handlers/packets/handlePlayerLeaveMapMessage';
import { handlePlayerLoggedInMessage } from '../handlers/packets/handlePlayerLoggedInMessage';
import { handlePlayerLoggedOutMessage } from '../handlers/packets/handlePlayerLoggedOutMessage';
import { handlePlayerMessageMessage } from '../handlers/packets/handlePlayerMessageMessage';
import { handlePlayerMoveMessage } from '../handlers/packets/handlePlayerMoveMessage';

export class SocketStore {
   public nickname: string;

   public socket: WebSocket;

   constructor(nickname: string) {
      makeAutoObservable(this);

      this.nickname = nickname;
      this.socket = new WebSocket(import.meta.env.VITE_SERVER_WEBSOCKET_URL);
      this.initialize();
   }

   initialize() {
      this.socket.onopen = () => {
         this.send({
            type: 'login',
            name: this.nickname,
         });
      };

      this.socket.onmessage = (event) => {
         try {
            const packet = zServerPacket.parse(JSON.parse(event.data.toString()));
            const response = SocketStore.handleServerPacket(packet);

            if (response !== null) {
               _assertTrue(isClientPacket(response));
               console.log(`Sending a ${response.type} packet...`);
               this.socket.send(JSON.stringify(response));
            }
         } catch (e) {
            console.error(e);
         }
      };

      this.socket.onerror = (error) => {
         console.error(error);
      };
   }

   send(packet: ClientPacket) {
      if (this.socket.readyState === this.socket.OPEN) {
         this.socket.send(JSON.stringify(packet));
      } else {
         console.log('Socket was not ready to send messages!');
      }
   }

   static handleServerPacket(message: ServerPacket): ClientPacket | null {
      return match(message)
         .with({ type: 'playerLoggedIn' }, (params) => handlePlayerLoggedInMessage(params))
         .with({ type: 'playerMessage' }, (params) => handlePlayerMessageMessage(params))
         .with({ type: 'playerLoggedOut' }, (params) => handlePlayerLoggedOutMessage(params))
         .with({ type: 'playerJoinMap' }, (params) => handlePlayerJoinMapMessage(params))
         .with({ type: 'playerLeaveMap' }, (params) => handlePlayerLeaveMapMessage(params))
         .with({ type: 'playerMove' }, (params) => handlePlayerMoveMessage(params))
         .with({ type: 'loginResponse' }, (params) => handleLoginResponse(params))
         .with({ type: 'messageResponse' }, (params) => handleMessageResponse(params))
         .with({ type: 'logoutResponse' }, (params) => handleLogoutResponse(params))
         .with({ type: 'moveResponse' }, (params) => handleMoveResponse(params))
         .with({ type: 'changeMapResponse' }, (params) => handleChangeMapResponse(params))
         .exhaustive();
   }
}
