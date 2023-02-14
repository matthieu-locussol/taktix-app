import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handleMoveResponse = (_: ServerPacketType<'moveResponse'>, _store: Store) => {};
