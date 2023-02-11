import { LogoutResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';

export const handleLogoutResponse = ({ response }: LogoutResponse) => {
   _assertTrue(response === 'success');
   return null;
};
