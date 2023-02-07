import { WebSocket } from 'ws';

interface Client {
   socket: WebSocket;
   data: {
      name: string;
      position: {
         x: number;
         y: number;
      };
   };
}

export const SOCKETS = new Map<string, Client>();
