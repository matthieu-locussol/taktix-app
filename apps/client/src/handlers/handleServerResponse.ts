import { ServerResponse } from 'shared/src/client/schemas/ServerResponse';
import { match } from 'ts-pattern';
import { handleChangeMapResponse } from './responses/handleChangeMapResponse';
import { handleLoginResponse } from './responses/handleLoginResponse';
import { handleLogoutResponse } from './responses/handleLogoutResponse';
import { handleMessageResponse } from './responses/handleMessageResponse';
import { handleMoveResponse } from './responses/handleMoveResponse';

export const handleServerResponse = (response: ServerResponse): void =>
   match(response)
      .with({ type: 'loginResponse' }, handleLoginResponse)
      .with({ type: 'messageResponse' }, handleMessageResponse)
      .with({ type: 'logoutResponse' }, handleLogoutResponse)
      .with({ type: 'moveResponse' }, handleMoveResponse)
      .with({ type: 'changeMapResponse' }, handleChangeMapResponse)
      .exhaustive();
