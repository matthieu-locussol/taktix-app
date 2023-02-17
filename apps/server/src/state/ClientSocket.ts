import { makeAutoObservable } from 'mobx';
import { ServerPacket } from 'shared/dist/packets/ServerPacket';
import { WebSocket } from 'ws';

export class ClientSocket {
   public socket: WebSocket;

   constructor(socket: WebSocket) {
      makeAutoObservable(this);

      this.socket = socket;
   }

   send(packet: ServerPacket) {
      this.socket.send(JSON.stringify(packet));
   }
}
