import { makeAutoObservable } from 'mobx';

interface ChatMessage {
   author: string;
   channel: number;
   content: string;
}

export class ChatStore {
   public input: string = '';

   public messages: ChatMessage[] = [];

   constructor() {
      makeAutoObservable(this);

      this.addMessage({
         author: 'Server',
         channel: 1,
         content: `Connected to server ${import.meta.env.VITE_SERVER_WEBSOCKET_URL}!`,
      });
   }

   public addMessage(message: ChatMessage) {
      if (message.content.length > 0) {
         this.messages.push(message);
      }
   }

   public setInput(input: string) {
      this.input = input;
   }
}
