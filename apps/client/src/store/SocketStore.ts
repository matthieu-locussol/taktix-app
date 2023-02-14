import { makeAutoObservable } from 'mobx';
import { ClientPacket } from 'shared/src/packets/ClientPacket';
import { ServerPacket, zServerPacket } from 'shared/src/packets/ServerPacket';
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

   private _store: Store;

   constructor(store: Store, nickname: string) {
      makeAutoObservable(this);

      this.socket = new WebSocket(import.meta.env.VITE_SERVER_WEBSOCKET_URL);
      this._store = store;

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
            this.handleServerPacket(packet);
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

   handleServerPacket(message: ServerPacket): null {
      return match(message)
         .with({ type: 'playerLoggedIn' }, (params) =>
            handlePlayerLoggedInMessage(params, this._store),
         )
         .with({ type: 'playerMessage' }, (params) =>
            handlePlayerMessageMessage(params, this._store),
         )
         .with({ type: 'playerLoggedOut' }, (params) =>
            handlePlayerLoggedOutMessage(params, this._store),
         )
         .with({ type: 'playerJoinMap' }, (params) =>
            handlePlayerJoinMapMessage(params, this._store),
         )
         .with({ type: 'playerLeaveMap' }, (params) =>
            handlePlayerLeaveMapMessage(params, this._store),
         )
         .with({ type: 'playerMove' }, (params) => handlePlayerMoveMessage(params, this._store))
         .with({ type: 'loginResponse' }, (params) => handleLoginResponse(params, this._store))
         .with({ type: 'messageResponse' }, (params) => handleMessageResponse(params, this._store))
         .with({ type: 'logoutResponse' }, (params) => handleLogoutResponse(params, this._store))
         .with({ type: 'moveResponse' }, (params) => handleMoveResponse(params, this._store))
         .with({ type: 'changeMapResponse' }, (params) =>
            handleChangeMapResponse(params, this._store),
         )
         .exhaustive();
   }
}
