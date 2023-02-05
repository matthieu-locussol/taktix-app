import { LoginResponse } from 'shared';
import { _assertTrue } from 'shared/src/utils/_assert';

export const handleLoginResponse = ({ data }: LoginResponse): void => {
   _assertTrue(data.response === 'connected');
};
