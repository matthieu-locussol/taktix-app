import { PlayerJoinMapMessage, PlayerJoinMapResponse } from 'shared';
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
