import { makeAutoObservable } from 'mobx';

interface ChatMessage {
   author: string;
   message: string;
}

export class ChatStore {
   public input: string = '';

   public messages: ChatMessage[] = [];

   constructor() {
      makeAutoObservable(this);
   }

   public addMessage(message: ChatMessage) {
      if (message.message.length > 0) {
         this.messages.push(message);
      }
   }

   public setInput(input: string) {
      this.input = input;
   }
}
