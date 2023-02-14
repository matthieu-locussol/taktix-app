import { makeAutoObservable } from 'mobx';
import { WebSocket } from 'ws';
import { ClientSocket } from './ClientSocket';

export class Client {
   socket: ClientSocket;

   map: string;

   name: string;

   position: {
      x: number;
      y: number;
   };

   constructor(socket: WebSocket) {
      makeAutoObservable(this);

      this.socket = new ClientSocket(socket);
      this.map = '';
      this.name = '';
      this.position = {
         x: 0,
         y: 0,
      };
   }

   setMap(map: string) {
      this.map = map;
   }

   setName(name: string) {
      this.name = name;
   }

   setPosition(x: number, y: number) {
      this.position = { x, y };
   }
}
