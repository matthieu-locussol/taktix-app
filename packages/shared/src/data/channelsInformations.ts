import type { PermissionMgt } from '../utils/permissionMgt.ts';
import type { TranslationKey } from './translations.ts';

import { Channel } from '../types/Channel.ts';

interface ChannelInformations {
   name: TranslationKey;
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
