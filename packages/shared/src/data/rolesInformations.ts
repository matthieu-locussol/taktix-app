import type { TranslationKey } from './translations.ts';

import { Role } from '../types/Role.ts';
import { PermissionMgt } from '../utils/permissionMgt.ts';

interface RoleInformations {
   name: TranslationKey;
   shortcut: string;
   permissions: number;
}

export const rolesInformations: Record<Role, RoleInformations> = {
   [Role.PLAYER]: {
      name: 'Player',
      shortcut: '',
      permissions: PermissionMgt.PERMISSIONS.Default,
   },
   [Role.ADMIN]: {
      name: 'Admin',
      shortcut: 'ADM',
      permissions:
         PermissionMgt.PERMISSIONS.Default |
         PermissionMgt.PERMISSIONS.SystemChannel |
         PermissionMgt.PERMISSIONS.ErrorChannel,
   },
   [Role.MODERATOR]: {
      name: 'Moderator',
      shortcut: 'MOD',
      permissions: PermissionMgt.PERMISSIONS.Default | PermissionMgt.PERMISSIONS.SystemChannel,
   },
};
