import type { Client } from '@colyseus/core';
import type { Role } from 'shared';

import { ReadyState } from 'shared';

interface User {
   role: Role;
   username: string;
   characterName: string;
   authRoomClient: Client;
   gameRoomClient: Client | null;
   chatRoomClient: Client | null;
}

export const usersMap = new Map<string, User>();

const isClientUnused = (client: Client | null) =>
   client === null || client.readyState === ReadyState.CLOSED;

export const removeDanglingUsers = () => {
   for (const [uuid, { authRoomClient, chatRoomClient, gameRoomClient }] of usersMap) {
      if (
         isClientUnused(authRoomClient) &&
         isClientUnused(chatRoomClient) &&
         isClientUnused(gameRoomClient)
      ) {
         usersMap.delete(uuid);
      }
   }
};
