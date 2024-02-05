import { Channel } from '../types/Channel';
import { PermissionMgt } from '../utils/permissionMgt';

interface ChannelInformations {
   name: string;
   shortcut: string;
   permissions: PermissionMgt.Permission[];
}

export const channelsInformations: Record<Channel, ChannelInformations> = {
   [Channel.SERVER]: {
      name: 'Server',
      shortcut: '/s',
      permissions: ['SystemChannel'],
   },
   [Channel.ERROR]: {
      name: 'Error',
      shortcut: '/e',
      permissions: ['ErrorChannel'],
   },
   [Channel.GENERAL]: {
      name: 'General',
      shortcut: '/g',
      permissions: ['Default'],
   },
   [Channel.TRADE]: {
      name: 'Trade',
      shortcut: '/t',
      permissions: ['Default'],
   },
   [Channel.PRIVATE]: {
      name: 'Private',
      shortcut: '/w',
      permissions: ['Default'],
   },
};
