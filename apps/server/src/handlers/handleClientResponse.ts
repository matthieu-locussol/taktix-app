import { ClientResponse } from 'shared';
import { match } from 'ts-pattern';
import { handlePlayerJoinMapResponse } from './responses/handlePlayerJoinMapResponse';
import { handlePlayerLeaveMapResponse } from './responses/handlePlayerLeaveMapResponse';
import { handlePlayerLoggedInResponse } from './responses/handlePlayerLoggedInResponse';
import { handlePlayerLoggedOutResponse } from './responses/handlePlayerLoggedOutResponse';
import { handlePlayerMessageResponse } from './responses/handlePlayerMessageResponse';
import { handlePlayerMoveResponse } from './responses/handlePlayerMoveResponse';

export const handleClientResponse = (data: ClientResponse, _socketId: string): void => {
   console.log(`Received a "${data.type}" response...`);

   return match(data)
      .with({ type: 'playerLoggedInResponse' }, handlePlayerLoggedInResponse)
      .with({ type: 'playerMessageResponse' }, handlePlayerMessageResponse)
      .with({ type: 'playerLoggedOutResponse' }, handlePlayerLoggedOutResponse)
      .with({ type: 'playerJoinMapResponse' }, handlePlayerJoinMapResponse)
      .with({ type: 'playerLeaveMapResponse' }, handlePlayerLeaveMapResponse)
      .with({ type: 'playerMoveResponse' }, handlePlayerMoveResponse)
      .exhaustive();
};
