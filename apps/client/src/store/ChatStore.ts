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
   }

   public addMessage(message: ChatMessage) {
      if (message.content.length > 0) {
         this.messages.push(this.formatMessage(message));
      }
   }

   private formatMessage(message: ChatMessage): ChatMessage {
      const { content } = message;
      const formattedContent = content.replace(
         /{{SERVER_URL}}/g,
         import.meta.env.VITE_SERVER_WEBSOCKET_URL,
      );

      return {
         ...message,
         content: formattedContent,
      };
   }

   public setInput(input: string) {
      this.input = input;
   }
}
