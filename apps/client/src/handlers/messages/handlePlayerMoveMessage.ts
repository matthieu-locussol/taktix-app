import { PlayerMoveMessage, PlayerMoveResponse } from 'shared';
import { getCurrentScene } from '../../utils/game';

export const handlePlayerMoveMessage = ({ data }: PlayerMoveMessage): PlayerMoveResponse => {
   getCurrentScene().moveExternalPlayer(data.name, data.x, data.y);

   return {
      type: 'playerMoveResponse',
      data: null,
   };
};
