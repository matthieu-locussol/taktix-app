import { TILE_SIZE } from 'shared/src/config';
import { _assert } from 'shared/src/utils/_assert';
import { SCALE_FACTOR, type Scene } from '../Scene';

export const makeGrid = (scene: Scene) => {
   _assert(scene.tilemap, 'Tilemap should be defined!');

   const grid = scene.add
      .grid(
         0,
         0,
         scene.tilemap.widthInPixels * SCALE_FACTOR * TILE_SIZE,
         scene.tilemap.heightInPixels * SCALE_FACTOR * TILE_SIZE,
         TILE_SIZE * SCALE_FACTOR,
         TILE_SIZE * SCALE_FACTOR,
         0x000000,
         0,
         0x1f2937,
         0.3,
      )
      .setDepth(3);

   if (scene.minimap !== null) {
      scene.minimap.ignore(grid);
   }

   return grid;
};
