import { ServerPacketType } from 'shared/src/packets/ServerPacket';
import { Store } from '../store/Store';

export const handleChangeMapResponse = (
   { players }: ServerPacketType<'changeMapResponse'>,
   store: Store,
) => {
   const currentScene = store.gameStore.getCurrentScene;
   if (currentScene) {
      // currentScene.deleteAllExternalPlayers();

      players.forEach(({ nickname, x, y }) => {
         currentScene.addExternalPlayer(nickname, { x, y });
      });
   }
};
