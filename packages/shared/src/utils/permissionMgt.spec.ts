import { describe, expect, it } from 'vitest';

import { PermissionMgt } from './permissionMgt.ts';

describe('permissionMgt', () => {
   describe('hasPermissions', () => {
      it('should return true if the bitset contains the permissions', () => {
         const permissions =
            PermissionMgt.PERMISSIONS.Default |
            PermissionMgt.PERMISSIONS.SystemChannel |
            PermissionMgt.PERMISSIONS.ErrorChannel;
         const permissionsWanted: PermissionMgt.Permission[] = ['SystemChannel', 'ErrorChannel'];

         expect(PermissionMgt.hasPermissions(permissions, permissionsWanted)).toBe(true);
      });

      it("should return false if the bitset doesn't contain the permissions", () => {
         const permissions = PermissionMgt.PERMISSIONS.Default;
         const permissionsWanted: PermissionMgt.Permission[] = ['SystemChannel', 'ErrorChannel'];

         expect(PermissionMgt.hasPermissions(permissions, permissionsWanted)).toBe(false);
      });
   });

   describe('hasSomePermissions', () => {
      it('should return true if the bitset contains at least one of the permissions', () => {
         const permissions = PermissionMgt.PERMISSIONS.SystemChannel;
         const permissionsWanted: PermissionMgt.Permission[] = ['SystemChannel', 'ErrorChannel'];

         expect(PermissionMgt.hasSomePermissions(permissions, permissionsWanted)).toBe(true);
      });

      it("should return false if the bitset doesn't contain any of the permissions", () => {
         const permissions = PermissionMgt.PERMISSIONS.Default;
         const permissionsWanted: PermissionMgt.Permission[] = ['SystemChannel', 'ErrorChannel'];

         expect(PermissionMgt.hasSomePermissions(permissions, permissionsWanted)).toBe(false);
      });
   });
});
