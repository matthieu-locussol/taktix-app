import type { InteractiveObject } from 'shared/src/types/InteractiveObject';

import { _assert } from 'shared/src/utils/_assert.ts';

import { SCALE_FACTOR } from '../Scene.ts';

import { registerInteractiveObjectEvents } from './registerInteractiveObjectEvents.ts';

const INTERACTIVE_OBJECT_DEPTH = 999;

export const makeInteractiveObject = (
   scene: Phaser.Scene,
   type: InteractiveObject,
   object: Phaser.Types.Tilemaps.TiledObject,
) => {
   _assert(object.polygon, 'Interactive object must have a polygon');

   const objectX = Number(object.x) * SCALE_FACTOR;
   const objectY = Number(object.y) * SCALE_FACTOR;

   const points = object.polygon.map(({ x, y }) => ({
      x: Number(x) * SCALE_FACTOR,
      y: Number(y) * SCALE_FACTOR,
   }));

   const polygon = scene.add
      .polygon(objectX, objectY, points, 0x000000, 0)
      .setDepth(INTERACTIVE_OBJECT_DEPTH)
      .setOrigin(0, 0)
      .setName(type);

   registerInteractiveObjectEvents(polygon);

   return {
      polygon,
      geometry: {
         ...polygon.geom,
         points: (polygon.geom as Phaser.Geom.Polygon).points.map(({ x, y }) => ({
            x: x + objectX,
            y: y + objectY,
         })),
      },
   };
};
