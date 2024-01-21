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

it('should have no initial message', () => {
   const store = new ChatStore();
   expect(store.messages).toHaveLength(0);
});

it('should add a new message', () => {
   const store = new ChatStore();
   expect(store.messages).toHaveLength(0);

   store.addMessage({ author: 'player1', channel: 1, content: 'content' });
   expect(store.messages).toHaveLength(1);
});
