import { ServerResponse } from 'shared';
import { match } from 'ts-pattern';
import { handleLoginResponse } from './responses/handleLoginResponse';
import { handleLogoutResponse } from './responses/handleLogoutResponse';
import { handleMessageResponse } from './responses/handleMessageResponse';

export const handleServerResponse = (response: ServerResponse): void =>
   match(response)
      .with({ type: 'loginResponse' }, handleLoginResponse)
      .with({ type: 'messageResponse' }, handleMessageResponse)
      .with({ type: 'logoutResponse' }, handleLogoutResponse)
      .exhaustive();
