export namespace PermissionMgt {
   export const PERMISSIONS = {
      Default: 0b0,
      SystemChannel: 0b1,
      ErrorChannel: 0b10,
   } as const;

   export type Permission = keyof typeof PERMISSIONS;

   export const hasPermissions = (permissions: number, permissionsWanted: Permission[]) =>
      permissionsWanted.every(
         (permission) => (permission === 'Default' || permissions & PERMISSIONS[permission]) !== 0,
      );

   export const hasSomePermissions = (permissions: number, permissionsWanted: Permission[]) =>
      permissionsWanted.some((permission) => hasPermissions(permissions, [permission]));
}
