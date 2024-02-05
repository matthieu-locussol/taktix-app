import { describe, expect, it } from 'vitest';
import { Channel } from '../types/Channel';
import { ChannelMgt } from './channelMgt';

describe('ChannelMgt', () => {
   describe('getPrefixedChannelName', () => {
      it('should return current channel if no channel shortcut is found', () => {
         const message = 'foo';
         const currentChannel = Channel.GENERAL;
         const result = ChannelMgt.getPrefixedChannelNameAndContent(message, currentChannel);
         expect(result).toEqual({
            channel: Channel.GENERAL,
            content: message,
         });
      });
   });

   describe('getPrefixedChannelName', () => {
      it('should return message channel if it exists', () => {
         const message = '/t foo';
         const currentChannel = Channel.GENERAL;
         const result = ChannelMgt.getPrefixedChannelNameAndContent(message, currentChannel);
         expect(result).toEqual({
            channel: Channel.TRADE,
            content: 'foo',
         });
      });
   });
});
