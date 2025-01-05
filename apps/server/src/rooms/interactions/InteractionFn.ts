import type { Client } from '@colyseus/core';
import type { PlayerState } from 'shared/src/states/PlayerState.ts';
import type { Room } from 'shared/src/types/Room.ts';

export type InteractionFn = (client: Client, player: PlayerState, room: Room) => Promise<boolean>;
