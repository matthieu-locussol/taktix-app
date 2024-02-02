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

   public displayedChannels: Channel[] = [
      Channel.GENERAL,
      Channel.LOCAL,
      Channel.SERVER,
      Channel.ERROR,
   ];

   public isChannelSelectorOpened: boolean = false;

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

   public isChannelDisplayed(channel: Channel): boolean {
      return this.displayedChannels.includes(channel);
   }

   public toggleChannelDisplay(channel: Channel) {
      if (this.isSystemChannel(channel)) {
         return;
      }

      if (this.isChannelDisplayed(channel)) {
         this.displayedChannels = this.displayedChannels.filter((c) => c !== channel);
      } else {
         this.displayedChannels.push(channel);
      }
   }

   public openChannelSelectorModal() {
      this.isChannelSelectorOpened = true;
   }

   public closeChannelSelectorModal() {
      this.isChannelSelectorOpened = false;
   }

   public get filteredMessages(): ChatMessage[] {
      return this.messages.filter((message) => this.displayedChannels.includes(message.channel));
   }
}
