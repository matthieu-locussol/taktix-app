import { LogoutResponse } from 'shared/src/client/schemas/responses/LogoutResponse';
import { _assertTrue } from 'shared/src/utils/_assert';

export const handleLogoutResponse = ({ data }: LogoutResponse): void => {
   _assertTrue(data.response === 'success');
};
