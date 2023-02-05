import { WebSocket } from 'ws';

interface Client {
   name: string;
   socket: WebSocket;
}

export const SOCKETS = new Map<string, Client>();
