import { LogoutResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';
import { Store } from '../store/Store';

export const handleLogoutResponse = ({ response }: LogoutResponse, _store: Store) => {
   _assertTrue(response === 'success');
   return null;
};
