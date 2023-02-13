import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { _assertTrue } from 'shared/src/utils/_assert';
import { Store } from '../store/Store';

export const handleLogoutResponse = (
   { response }: ServerPacketType<'logoutResponse'>,
   _store: Store,
) => {
   _assertTrue(response === 'success');
   return null;
};
