import { expect, it } from 'vitest';
import { WebSocket } from 'ws';
import { makeSocketId } from '../utils/socketId';
import { State } from './State';

it('should have default values', () => {
   const state = new State();
   expect(state.clients.size).toEqual(0);
   expect([...state.clients.entries()]).toEqual([]);
});

it('should initialize a new client', () => {
   const state = new State();
   const socketId = makeSocketId();
   state.initializeNewClient(socketId, new WebSocket(null));

   expect(state.clients.size).toEqual(1);

   const client = state.getClient(socketId);
   expect(client.map).toEqual('');
   expect(client.characterName).toEqual('');
   expect(client.position).toStrictEqual({ x: 0, y: 0 });
});

it('should get other clients', () => {
   const state = new State();
   const socketIds = [makeSocketId(), makeSocketId(), makeSocketId()];

   state.initializeNewClient(socketIds[0], new WebSocket(null));
   state.initializeNewClient(socketIds[1], new WebSocket(null));
   state.initializeNewClient(socketIds[2], new WebSocket(null));

   state.getClient(socketIds[0]).setCharacterName('A');
   state.getClient(socketIds[1]).setCharacterName('B');
   state.getClient(socketIds[2]).setCharacterName('C');

   expect(state.clients.size).toEqual(3);

   const otherPlayersNames = state
      .getOtherPlayers(socketIds[0])
      .map(({ characterName: name }) => name);
   expect(otherPlayersNames).toEqual(['B', 'C']);
});

it('should get other clients on the same map', () => {
   const state = new State();
   const socketIds = [makeSocketId(), makeSocketId(), makeSocketId()];

   state.initializeNewClient(socketIds[0], new WebSocket(null));
   state.initializeNewClient(socketIds[1], new WebSocket(null));
   state.initializeNewClient(socketIds[2], new WebSocket(null));

   state.getClient(socketIds[0]).setCharacterName('A');
   state.getClient(socketIds[1]).setCharacterName('B');
   state.getClient(socketIds[2]).setCharacterName('C');

   state.getClient(socketIds[0]).setMap('1');
   state.getClient(socketIds[1]).setMap('2');
   state.getClient(socketIds[2]).setMap('1');

   expect(state.clients.size).toEqual(3);

   const otherPlayersNames = state
      .getOtherPlayersSameMap(socketIds[0])
      .map(({ characterName: name }) => name);
   expect(otherPlayersNames).toEqual(['C']);
});
