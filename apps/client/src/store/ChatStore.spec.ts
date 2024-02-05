import { Channel } from 'shared/src/types/Channel';
import { describe, expect, it, vi } from 'vitest';
import { ChatStore } from './ChatStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const characterStoreMock = {
      name: 'player',
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      characterStore: characterStoreMock,
   }));

   return { Store: MockedStore };
});

describe('ChatStore', () => {
   it('should be initialized', () => {
      const store = new ChatStore(new Store());

      expect(store).toBeDefined();
      expect(store.input).toEqual('');
      expect(store.messages).toHaveLength(0);
   });

   it('should set the input', () => {
      const store = new ChatStore(new Store());
      store.setInput('John');
      expect(store.input).toBe('John');
   });

   it('should add a new message', () => {
      const store = new ChatStore(new Store());
      store.addMessage({ author: 'player1', channel: Channel.GENERAL, content: 'content' });
      expect(store.messages).toHaveLength(1);
   });

   it('should add a new private message', () => {
      const store = new ChatStore(new Store());

      store.addPrivateMessage({ author: 'player', content: 'content', target: 'player2' });
      expect(store.messages).toHaveLength(1);
      expect(store.messages[0].author).toBe('To player2');

      store.addPrivateMessage({ author: 'player2', content: 'content', target: 'player' });
      expect(store.messages).toHaveLength(2);
      expect(store.messages[1].author).toBe('From player2');
   });
});
