import { makeAutoObservable } from 'mobx';
import { WebSocket } from 'ws';
import { ClientSocket } from './ClientSocket';

export class Client {
   socket: ClientSocket;

   map: string;

   username: string;

   characterName: string;

   position: {
      x: number;
      y: number;
   };

   constructor(socket: WebSocket) {
      makeAutoObservable(this);

      this.socket = new ClientSocket(socket);
      this.map = '';
      this.username = '';
      this.characterName = '';
      this.position = {
         x: 0,
         y: 0,
      };
   }

   setMap(map: string) {
      this.map = map;
   }

   setUsername(username: string) {
      this.username = username;
   }

   setCharacterName(characterName: string) {
      this.characterName = characterName;
   }

   setPosition(x: number, y: number) {
      this.position = { x, y };
   }
}
