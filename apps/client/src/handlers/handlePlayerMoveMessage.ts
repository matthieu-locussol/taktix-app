import { PlayerMoveMessage, PlayerMoveResponse } from 'shared';
import { getCurrentScene } from '../utils/game';

export const handlePlayerMoveMessage = ({ name, x, y }: PlayerMoveMessage): PlayerMoveResponse => {
   getCurrentScene().moveExternalPlayer(name, x, y);

   return {
      type: 'playerMoveResponse',
   };
};
