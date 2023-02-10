import { ChangeMapResponse } from 'shared/src/client/schemas/responses/ChangeMapResponse';
import { getCurrentScene } from '../../utils/game';

export const handleChangeMapResponse = ({ data }: ChangeMapResponse): void => {
   getCurrentScene()?.deleteAllExternalPlayers();

   data.players.forEach(({ name, posX, posY }) => {
      getCurrentScene().addExternalPlayer(name, { x: posX, y: posY });
   });
};
