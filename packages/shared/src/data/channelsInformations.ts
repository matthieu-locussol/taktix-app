import { Channel } from '../types/Channel';

interface ChannelInformations {
   name: string;
   shortcut: string;
}

export const channelsInformations: Record<Channel, ChannelInformations> = {
   [Channel.SERVER]: {
      name: 'Server',
      shortcut: '/s',
   },
   [Channel.ERROR]: {
      name: 'Error',
      shortcut: '/e',
   },
   [Channel.GENERAL]: {
      name: 'General',
      shortcut: '/g',
   },
   [Channel.TRADE]: {
      name: 'Trade',
      shortcut: '/t',
   },
};
