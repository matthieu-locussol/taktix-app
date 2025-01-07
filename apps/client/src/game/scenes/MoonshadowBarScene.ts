// This file has been automatically generated. DO NOT edit it manually.

import { Scene } from '../Scene';

export class MoonshadowBarScene extends Scene {
   constructor() {
      super('MoonshadowBarRoom');
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('MoonshadowBar_music', { loop: true, volume: 0.25 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'MoonshadowBar_tiledmap' });
      this.tilemap.addTilesetImage('RW_Interior', 'RW_Interior_tileset');
      this.initializeTilemap(['RW_Interior']);

      return this.tilemap;
   }
}
