import { PlayerLeaveMapMessage, PlayerLeaveMapResponse } from 'shared';
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
