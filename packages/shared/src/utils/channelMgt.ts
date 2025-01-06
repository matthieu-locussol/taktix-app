import type { Role } from '../types/Role';

import { channelsInformations } from '../data/channelsInformations';
import { rolesInformations } from '../data/rolesInformations';
import { Channel } from '../types/Channel';

import { PermissionMgt } from './permissionMgt';

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

   export const isPrivateMessage = (message: string) =>
      message.startsWith(channelsInformations[Channel.PRIVATE].shortcut);

   export const extractPrivateMessage = (message: string) => ({
      target: message.split(' ')[1],
      content: message.split(' ').slice(2).join(' '),
   });

   export const hasPermission = (role: Role, channel: Channel) => {
      const { permissions } = rolesInformations[role];
      const permissionsWanted = channelsInformations[channel].permissions;

      return PermissionMgt.hasPermissions(permissions, permissionsWanted);
   };
}
