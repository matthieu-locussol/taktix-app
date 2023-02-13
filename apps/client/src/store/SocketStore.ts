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
import { log } from '../utils/log';
import { Store } from './Store';

export class SocketStore {
   public socket: WebSocket;

   public store: Store;

   constructor(store: Store, nickname: string) {
      makeAutoObservable(this);

      this.socket = new WebSocket(import.meta.env.VITE_SERVER_WEBSOCKET_URL);
      this.store = store;
      this.initialize(nickname);
   }

   initialize(nickname: string) {
      this.socket.onopen = () => {
         this.send({
            type: 'login',
            name: nickname,
         });
      };

      this.socket.onmessage = (event) => {
         try {
            const packet = zServerPacket.parse(JSON.parse(event.data.toString()));
            log(`Received a ${packet.type} packet`);
            const response = this.handleServerPacket(packet);

            if (response !== null) {
               _assertTrue(isClientPacket(response));
               log(`Sending a ${response.type} packet...`);
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
         log(`Sending a ${packet.type} packet...`);
         this.socket.send(JSON.stringify(packet));
      } else {
         log('Socket was not ready to send messages!');
      }
   }

   handleServerPacket(message: ServerPacket): ClientPacket | null {
      return match(message)
         .with({ type: 'playerLoggedIn' }, (params) =>
            handlePlayerLoggedInMessage(params, this.store),
         )
         .with({ type: 'playerMessage' }, (params) =>
            handlePlayerMessageMessage(params, this.store),
         )
         .with({ type: 'playerLoggedOut' }, (params) =>
            handlePlayerLoggedOutMessage(params, this.store),
         )
         .with({ type: 'playerJoinMap' }, (params) =>
            handlePlayerJoinMapMessage(params, this.store),
         )
         .with({ type: 'playerLeaveMap' }, (params) =>
            handlePlayerLeaveMapMessage(params, this.store),
         )
         .with({ type: 'playerMove' }, (params) => handlePlayerMoveMessage(params, this.store))
         .with({ type: 'loginResponse' }, (params) => handleLoginResponse(params, this.store))
         .with({ type: 'messageResponse' }, (params) => handleMessageResponse(params, this.store))
         .with({ type: 'logoutResponse' }, (params) => handleLogoutResponse(params, this.store))
         .with({ type: 'moveResponse' }, (params) => handleMoveResponse(params, this.store))
         .with({ type: 'changeMapResponse' }, (params) =>
            handleChangeMapResponse(params, this.store),
         )
         .exhaustive();
   }
}
