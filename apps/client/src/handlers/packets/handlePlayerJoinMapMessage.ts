import { PlayerJoinMapMessage, PlayerJoinMapResponse } from 'shared';
import { getCurrentScene } from '../../utils/game';

export const handlePlayerJoinMapMessage = ({
   name,
   x,
   y,
}: PlayerJoinMapMessage): PlayerJoinMapResponse => {
   getCurrentScene().addExternalPlayer(name, { x, y });

   return {
      type: 'playerJoinMapResponse',
   };
};
