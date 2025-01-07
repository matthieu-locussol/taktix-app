// This file has been automatically generated. DO NOT edit it manually.

import { Scene } from '../Scene';

export class MoonshadowShopScene extends Scene {
   constructor() {
      super('MoonshadowShopRoom');
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('MoonshadowShop_music', { loop: true, volume: 0.25 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'MoonshadowShop_tiledmap' });
      this.tilemap.addTilesetImage('RW_Interior', 'RW_Interior_tileset');
      this.initializeTilemap(['RW_Interior']);

      return this.tilemap;
   }
}
