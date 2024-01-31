import { SCALE_FACTOR, TILE_SIZE, type Scene } from '../Scene';

export const makeMarker = (scene: Scene) => {
   const marker = scene.add
      .graphics()
      .lineStyle(2, 0xffffff, 0.8)
      .strokeRoundedRect(0, 0, TILE_SIZE * SCALE_FACTOR, TILE_SIZE * SCALE_FACTOR, 4)
      .setDepth(3)
      .setVisible(false);

   marker.postFX.addGlow(0xffffff, 1, 0, false, 1, 2);
   marker.postFX.addBloom(0xffffff);

   if (scene.minimap !== null) {
      scene.minimap.ignore(marker);
   }

   return marker;
};
