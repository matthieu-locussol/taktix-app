import { makeAutoObservable } from 'mobx';
import { Channel } from 'shared/src/types/Channel';
import { Store } from './Store';

interface ChatMessage {
   author: string;
   channel: Channel;
   content: string;
}

interface PrivateMessage {
   author: string;
   target: string;
   content: string;
}

export class ChatStore {
   private _store: Store;

   public input: string = '';

   public inputRef: HTMLInputElement | null = null;

   public messages: ChatMessage[] = [];

   public currentChannel: Channel = Channel.GENERAL;

   public displayedChannels: Channel[] = [
      Channel.GENERAL,
      Channel.TRADE,
      Channel.PRIVATE,
      Channel.SERVER,
      Channel.ERROR,
   ];

   public isCurrentChannelSelectorOpened: boolean = false;

   public isChannelsSelectorOpened: boolean = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public addMessage(message: ChatMessage) {
      if (message.content.length > 0) {
         this.messages.push(this.formatMessage(message));
      }
   }

   public addPrivateMessage({ author, content, target }: PrivateMessage) {
      if (content.length > 0) {
         this.messages.push(
            this.formatMessage({
               author:
                  author === this._store.characterStore.name ? `To ${target}` : `From ${author}`,
               content,
               channel: Channel.PRIVATE,
            }),
         );
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

   public setInputRef(inputRef: HTMLInputElement | null) {
      this.inputRef = inputRef;
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

   public openCurrentChannelSelectorModal() {
      this.isCurrentChannelSelectorOpened = true;
   }

   public closeCurrentChannelSelectorModal() {
      this.isCurrentChannelSelectorOpened = false;
   }

   public openChannelsSelectorModal() {
      this.isChannelsSelectorOpened = true;
   }

   public closeChannelsSelectorModal() {
      this.isChannelsSelectorOpened = false;
   }

   public get filteredMessages(): ChatMessage[] {
      return this.messages.filter((message) => this.displayedChannels.includes(message.channel));
   }

   public setCurrentChannel(channel: Channel) {
      this.currentChannel = channel;
   }
}
