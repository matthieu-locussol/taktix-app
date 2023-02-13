import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handleMessageResponse = (
   _: Extract<ServerPacket, { type: 'messageResponse' }>,
   _store: Store,
) => null;
