import type { Client } from '@colyseus/core';
import type { PlayerState, Room } from 'shared';

export type InteractionFn = (client: Client, player: PlayerState, room: Room) => Promise<boolean>;
