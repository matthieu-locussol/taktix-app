import { makeAutoObservable } from 'mobx';
import { ClientPacket } from 'shared/src/packets/ClientPacket';
import { ServerPacket, zServerPacket } from 'shared/src/packets/ServerPacket';
import { log } from 'shared/src/utils/log';
import { match } from 'ts-pattern';
import { handleChangeMapResponse } from '../handlers/handleChangeMapResponse';
import { handleCreateCharacterResponse } from '../handlers/handleCreateCharacterResponse';
import { handleDeleteCharacterResponse } from '../handlers/handleDeleteCharacterResponse';
import { handleLoginResponse } from '../handlers/handleLoginResponse';
import { handlePlayerJoinMap } from '../handlers/handlePlayerJoinMap';
import { handlePlayerLeaveMap } from '../handlers/handlePlayerLeaveMap';
import { handlePlayerLoggedIn } from '../handlers/handlePlayerLoggedIn';
import { handlePlayerLoggedOut } from '../handlers/handlePlayerLoggedOut';
import { handlePlayerMessage } from '../handlers/handlePlayerMessage';
import { handlePlayerMove } from '../handlers/handlePlayerMove';
import { handleSelectCharacterResponse } from '../handlers/handleSelectCharacterResponse';
import { Store } from './Store';

export class SocketStore {
   public socket: WebSocket;

   private _store: Store;

   constructor(store: Store, username: string, password: string) {
      makeAutoObservable(this);

      this.socket = new WebSocket(import.meta.env.VITE_SERVER_WEBSOCKET_URL);
      this._store = store;

      this.initialize(username, password);
   }

   initialize(username: string, password: string) {
      this.socket.onopen = () => {
         this.send({
            type: 'login',
            username,
            password,
         });
      };

      this.socket.onmessage = async (event) => {
         try {
            const packet = zServerPacket.parse(JSON.parse(event.data.toString()));
            log(`Received a ${packet.type} packet`);
            await this.handleServerPacket(packet);
         } catch (e) {
            console.error(e);
         }
      };

      this.socket.onerror = (error) => {
         console.error(error);
      };

      this.socket.onclose = () => {
         this._store.loginStore.reset();
         this._store.loginStore.setErrorMessage('Disconnected from server!');
         this._store.screenStore.setScreen('login');
         this._store.screenStore.setLoggedIn(false);
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

   async handleServerPacket(message: ServerPacket): Promise<void> {
      return match(message)
         .with({ type: 'playerLoggedIn' }, (params) => handlePlayerLoggedIn(params, this._store))
         .with({ type: 'playerMessage' }, (params) => handlePlayerMessage(params, this._store))
         .with({ type: 'playerLoggedOut' }, (params) => handlePlayerLoggedOut(params, this._store))
         .with({ type: 'playerJoinMap' }, (params) => handlePlayerJoinMap(params, this._store))
         .with({ type: 'playerLeaveMap' }, (params) => handlePlayerLeaveMap(params, this._store))
         .with({ type: 'playerMove' }, (params) => handlePlayerMove(params, this._store))
         .with({ type: 'loginResponse' }, (params) => handleLoginResponse(params, this._store))
         .with({ type: 'selectCharacterResponse' }, (params) =>
            handleSelectCharacterResponse(params, this._store),
         )
         .with({ type: 'createCharacterResponse' }, (params) =>
            handleCreateCharacterResponse(params, this._store),
         )
         .with({ type: 'deleteCharacterResponse' }, (params) =>
            handleDeleteCharacterResponse(params, this._store),
         )
         .with({ type: 'changeMapResponse' }, (params) =>
            handleChangeMapResponse(params, this._store),
         )
         .exhaustive();
   }
}
