import { LogoutResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';

export const handleLogoutResponse = ({ response }: LogoutResponse): void => {
   _assertTrue(response === 'success');
};
