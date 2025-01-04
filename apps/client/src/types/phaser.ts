import type { AnimatedTiles } from '../plugins/AnimatedTiles.ts';

declare module 'phaser' {
   namespace Scenes {
      interface Systems {
         animatedTiles: AnimatedTiles;
      }
   }
}
