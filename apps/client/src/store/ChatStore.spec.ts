import { expect, it } from 'vitest';
import { ChatStore } from './ChatStore';

it('should have an empty input', () => {
   const store = new ChatStore();
   expect(store.input).toEqual('');
});

it('should set the input', () => {
   const store = new ChatStore();
   store.setInput('John');
   expect(store.input).toBe('John');
});

it('should have the initial server message', () => {
   const store = new ChatStore();
   expect(store.messages).toHaveLength(1);
   expect(store.messages[0]).toEqual({
      author: 'Server',
      message: `Connected to server ${import.meta.env.VITE_SERVER_WEBSOCKET_URL}!`,
   });
});

it('should add a new message', () => {
   const store = new ChatStore();
   expect(store.messages).toHaveLength(1);

   store.addMessage({ author: 'player1', message: 'content' });
   expect(store.messages).toHaveLength(2);
});
