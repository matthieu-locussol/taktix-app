import { expect, it } from 'vitest';
import { WebSocket } from 'ws';
import { Client } from './Client';

it('should have default values', () => {
   const socket = new WebSocket(null);
   const store = new Client(socket);

   expect(store.map).toEqual('');
   expect(store.name).toEqual('');
   expect(store.position).toEqual({ x: 0, y: 0 });
});

it('should set the map', () => {
   const socket = new WebSocket(null);
   const store = new Client(socket);

   store.setMap('clouds');
   expect(store.map).toBe('clouds');
});

it('should set the name', () => {
   const socket = new WebSocket(null);
   const store = new Client(socket);

   store.setName('John');
   expect(store.name).toBe('John');
});

it('should set the position', () => {
   const socket = new WebSocket(null);
   const store = new Client(socket);

   store.setPosition(12, 7);
   expect(store.position).toStrictEqual({ x: 12, y: 7 });
});
