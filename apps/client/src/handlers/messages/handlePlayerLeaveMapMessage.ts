import { PlayerLeaveMapMessage } from 'shared/src/client/schemas/messages/PlayerLeaveMapMessage';
import { PlayerLeaveMapResponse } from 'shared/src/server/schemas/responses/PlayerLeaveMapResponse';
import { getCurrentScene } from '../../utils/game';

export const handlePlayerLeaveMapMessage = ({
   data,
}: PlayerLeaveMapMessage): PlayerLeaveMapResponse => {
   getCurrentScene().deleteExternalPlayer(data.name);

   return {
      type: 'playerLeaveMapResponse',
      data: null,
   };
};
