import { describe, expect, it } from 'vitest';
import { Channel } from '../types/Channel';
import { Role } from '../types/Role';
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

   describe('isPrivateMessage', () => {
      it('should return true if message is private', () => {
         const message = '/w foo bar';
         const result = ChannelMgt.isPrivateMessage(message);
         expect(result).toEqual(true);
      });

      it('should return false if message is not private', () => {
         const message = '/t foo bar';
         const result = ChannelMgt.isPrivateMessage(message);
         expect(result).toEqual(false);
      });
   });

   describe('extractPrivateMessage', () => {
      it('should return target and content', () => {
         const message = '/w foo bar';
         const result = ChannelMgt.extractPrivateMessage(message);
         expect(result).toEqual({
            target: 'foo',
            content: 'bar',
         });
      });
   });

   describe('hasPermission', () => {
      it('should return true if role has permission', () => {
         const channel = Channel.SERVER;
         const result = ChannelMgt.hasPermission(Role.ADMIN, channel);
         expect(result).toEqual(true);
      });

      it('should return false if role does not have permission', () => {
         const channel = Channel.SERVER;
         const result = ChannelMgt.hasPermission(Role.PLAYER, channel);
         expect(result).toEqual(false);
      });
   });
});
