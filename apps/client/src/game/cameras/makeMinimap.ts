import type { Scene } from '../Scene';

export const MINIMAP_SIZE = 200;
export const MINIMAP_ZOOM = 0.1;
export const MINIMAP_OFFSET = 8;

export const makeMinimap = (scene: Scene) => {
   const minimap = scene.cameras
      .add(MINIMAP_OFFSET, MINIMAP_OFFSET, MINIMAP_SIZE, MINIMAP_SIZE)
      .setZoom(MINIMAP_ZOOM)
      .setName('minimap')
      .setBackgroundColor(0x374151)
      .setMask(
         scene.make
            .graphics()
            .fillCircle(
               MINIMAP_SIZE / 2 + MINIMAP_OFFSET,
               MINIMAP_SIZE / 2 + MINIMAP_OFFSET,
               MINIMAP_SIZE / 2,
            )
            .createGeometryMask(),
      )
      .setRoundPixels(true);

   return minimap;
};
