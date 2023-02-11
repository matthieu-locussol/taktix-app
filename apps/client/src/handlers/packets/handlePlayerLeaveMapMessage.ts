import { PlayerLeaveMapMessage, PlayerLeaveMapResponse } from 'shared';
import { getCurrentScene } from '../../utils/game';

export const handlePlayerLeaveMapMessage = ({
   name,
}: PlayerLeaveMapMessage): PlayerLeaveMapResponse => {
   getCurrentScene().deleteExternalPlayer(name);

   return {
      type: 'playerLeaveMapResponse',
   };
};
