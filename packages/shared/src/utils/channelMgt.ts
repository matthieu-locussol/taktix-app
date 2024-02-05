import { channelsInformations } from '../data/channelsInformations';
import { Channel } from '../types/Channel';

export namespace ChannelMgt {
   export const getPrefixedChannelNameAndContent = (message: string, currentChannel: Channel) => {
      const channelShortcut = message.split(' ')[0];
      const channel = Object.entries(channelsInformations).find(
         ([, { shortcut }]) => shortcut === channelShortcut,
      );

      if (channel !== undefined) {
         return {
            channel: +channel[0] as Channel,
            content: message.slice(channelShortcut.length + 1),
         };
      }

      return {
         channel: currentChannel,
         content: message,
      };
   };
}
