import { makeAutoObservable } from 'mobx';
import { WebSocket } from 'ws';
import { SocketWrapper } from './SocketWrapper';

export class Client {
   socket: SocketWrapper;

   data: {
      map: string;
      name: string;
      position: {
         x: number;
         y: number;
      };
   };

   constructor(socket: WebSocket) {
      makeAutoObservable(this);

      this.socket = new SocketWrapper(socket);
      this.data = {
         map: '',
         name: '',
         position: {
            x: 0,
            y: 0,
         },
      };
   }

   setPosition(x: number, y: number) {
      this.data.position = { x, y };
   }
}
