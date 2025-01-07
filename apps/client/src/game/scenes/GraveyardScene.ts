// This file has been automatically generated. DO NOT edit it manually.

import { Scene } from '../Scene';

export class GraveyardScene extends Scene {
   constructor() {
      super('GraveyardRoom');
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('Graveyard_music', { loop: true, volume: 0.25 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'Graveyard_tiledmap' });
      this.tilemap.addTilesetImage('RW_Graveyard', 'RW_Graveyard_tileset');
      this.tilemap.addTilesetImage('KE_Ground_Tiles', 'KE_Ground_Tiles_tileset');
      this.initializeTilemap(['RW_Graveyard', 'KE_Ground_Tiles']);

      return this.tilemap;
   }
}
