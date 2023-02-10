import { PlayerJoinMapMessage } from 'shared/src/client/schemas/messages/PlayerJoinMapMessage';
import { PlayerJoinMapResponse } from 'shared/src/server/schemas/responses/PlayerJoinMapResponse';
import { getCurrentScene } from '../../utils/game';

export const handlePlayerJoinMapMessage = ({
   data,
}: PlayerJoinMapMessage): PlayerJoinMapResponse => {
   getCurrentScene().addExternalPlayer(data.name, { x: data.x, y: data.y });

   return {
      type: 'playerJoinMapResponse',
      data: null,
   };
};
