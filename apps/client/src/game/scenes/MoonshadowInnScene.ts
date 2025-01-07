// This file has been automatically generated. DO NOT edit it manually.

import { Scene } from '../Scene';

export class MoonshadowInnScene extends Scene {
   constructor() {
      super('MoonshadowInnRoom');
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('MoonshadowInn_music', { loop: true, volume: 0.25 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'MoonshadowInn_tiledmap' });
      this.tilemap.addTilesetImage('FDR_Interior', 'FDR_Interior_tileset');
      this.initializeTilemap(['FDR_Interior']);

      return this.tilemap;
   }
}
