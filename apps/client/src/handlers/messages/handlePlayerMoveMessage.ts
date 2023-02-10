import { PlayerMoveMessage } from 'shared/src/client/schemas/messages/PlayerMoveMessage';
import { PlayerMoveResponse } from 'shared/src/server/schemas/responses/PlayerMoveResponse';
import { getCurrentScene } from '../../utils/game';

export const handlePlayerMoveMessage = ({ data }: PlayerMoveMessage): PlayerMoveResponse => {
   getCurrentScene().moveExternalPlayer(data.name, data.x, data.y);

   return {
      type: 'playerMoveResponse',
      data: null,
   };
};
