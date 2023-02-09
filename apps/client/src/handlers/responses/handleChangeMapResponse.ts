import { ChangeMapResponse } from 'shared';
import { getCurrentScene } from '../../utils/game';

export const handleChangeMapResponse = ({ data }: ChangeMapResponse): void => {
   data.players.forEach(({ name, posX, posY }) => {
      getCurrentScene().addExternalPlayer(name, { x: posX, y: posY });
   });
};
