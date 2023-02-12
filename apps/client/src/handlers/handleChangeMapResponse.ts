import { ChangeMapResponse } from 'shared';
import { getCurrentScene } from '../utils/game';

export const handleChangeMapResponse = ({ players }: ChangeMapResponse) => {
   getCurrentScene()?.deleteAllExternalPlayers();

   players.forEach(({ name, posX, posY }) => {
      getCurrentScene().addExternalPlayer(name, { x: posX, y: posY });
   });

   return null;
};
