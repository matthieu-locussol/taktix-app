import type { AnimatedTiles } from '../plugins/AnimatedTiles';

declare module 'phaser' {
   namespace Scenes {
      interface Systems {
         animatedTiles: AnimatedTiles;
      }
   }
}
