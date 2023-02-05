import { LogoutResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';

export const handleLogoutResponse = ({ data }: LogoutResponse): void => {
   _assertTrue(data.response === 'success');
};
