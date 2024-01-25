import { makeAutoObservable } from 'mobx';
import { Channel } from 'shared/src/types/Channel';

interface ChatMessage {
   author: string;
   channel: Channel;
   content: string;
}

export class ChatStore {
   public input: string = '';

   public messages: ChatMessage[] = [];

   public currentChannel: Channel = Channel.GENERAL;

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

   public isSystemChannel(channel: Channel): boolean {
      return channel === Channel.SERVER || channel === Channel.ERROR;
   }

   public getChannelColor(channel: Channel): string {
      if (channel === Channel.ERROR) {
         return 'red';
      }

      if (channel === Channel.SERVER) {
         return 'green';
      }

      return 'white';
   }
}
