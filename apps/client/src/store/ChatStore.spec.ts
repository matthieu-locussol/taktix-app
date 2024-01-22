import { describe, expect, it } from 'vitest';
import { ChatStore } from './ChatStore';

describe('ChatStore', () => {
   it('should be initialized', () => {
      const store = new ChatStore();

      expect(store).toBeDefined();
      expect(store.input).toEqual('');
      expect(store.messages).toHaveLength(0);
   });

   it('should set the input', () => {
      const store = new ChatStore();
      store.setInput('John');
      expect(store.input).toBe('John');
   });

   it('should add a new message', () => {
      const store = new ChatStore();
      store.addMessage({ author: 'player1', channel: 1, content: 'content' });
      expect(store.messages).toHaveLength(1);
   });
});
