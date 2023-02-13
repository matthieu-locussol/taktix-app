import { makeAutoObservable } from 'mobx';
import { _assert } from 'shared';
import { WebSocket } from 'ws';
import { SocketId } from '../utils/socketId';
import { Client } from './Client';

export class State {
   public clients = new Map<SocketId, Client>();

   constructor() {
      makeAutoObservable(this);
   }

   initializeNewClient(socketId: SocketId, socket: WebSocket) {
      this.clients.set(socketId, new Client(socket));
   }

   getClient(socketId: SocketId) {
      const client = this.clients.get(socketId);
      _assert(client);
      return client;
   }

   getOtherClients(socketId: SocketId) {
      const entries = [...this.clients.entries()];
      const filteredEntries = entries.filter(([currentSocketId]) => socketId !== currentSocketId);
      const clients = filteredEntries.map(([_, client]) => client);
      return clients;
   }
}
