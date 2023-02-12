import { makeAutoObservable } from 'mobx';
import { ClientPacket, isClientPacket } from 'shared/src/packets/ClientPacket';
import { ServerPacket, zServerPacket } from 'shared/src/packets/ServerPacket';
import { _assertTrue } from 'shared/src/utils/_assert';
import { match } from 'ts-pattern';
import { handleChangeMapResponse } from '../handlers/handleChangeMapResponse';
import { handleLoginResponse } from '../handlers/handleLoginResponse';
import { handleLogoutResponse } from '../handlers/handleLogoutResponse';
import { handleMessageResponse } from '../handlers/handleMessageResponse';
import { handleMoveResponse } from '../handlers/handleMoveResponse';
import { handlePlayerJoinMapMessage } from '../handlers/handlePlayerJoinMapMessage';
import { handlePlayerLeaveMapMessage } from '../handlers/handlePlayerLeaveMapMessage';
import { handlePlayerLoggedInMessage } from '../handlers/handlePlayerLoggedInMessage';
import { handlePlayerLoggedOutMessage } from '../handlers/handlePlayerLoggedOutMessage';
import { handlePlayerMessageMessage } from '../handlers/handlePlayerMessageMessage';
import { handlePlayerMoveMessage } from '../handlers/handlePlayerMoveMessage';

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
         .with({ type: 'playerLoggedIn' }, handlePlayerLoggedInMessage)
         .with({ type: 'playerMessage' }, handlePlayerMessageMessage)
         .with({ type: 'playerLoggedOut' }, handlePlayerLoggedOutMessage)
         .with({ type: 'playerJoinMap' }, handlePlayerJoinMapMessage)
         .with({ type: 'playerLeaveMap' }, handlePlayerLeaveMapMessage)
         .with({ type: 'playerMove' }, handlePlayerMoveMessage)
         .with({ type: 'loginResponse' }, handleLoginResponse)
         .with({ type: 'messageResponse' }, handleMessageResponse)
         .with({ type: 'logoutResponse' }, handleLogoutResponse)
         .with({ type: 'moveResponse' }, handleMoveResponse)
         .with({ type: 'changeMapResponse' }, handleChangeMapResponse)
         .exhaustive();
   }
}
