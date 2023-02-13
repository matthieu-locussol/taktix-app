import { ServerPacket } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handleMoveResponse = (
   _: Extract<ServerPacket, { type: 'moveResponse' }>,
   _store: Store,
) => null;
