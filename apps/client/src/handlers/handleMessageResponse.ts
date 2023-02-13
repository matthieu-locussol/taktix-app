import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handleMessageResponse = (_: ServerPacketType<'messageResponse'>, _store: Store) =>
   null;
