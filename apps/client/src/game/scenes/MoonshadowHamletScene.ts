// This file has been automatically generated. DO NOT edit it manually.

import { Scene } from '../Scene';

export class MoonshadowHamletScene extends Scene {
   constructor() {
      super('MoonshadowHamletRoom');
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('MoonshadowHamlet_music', { loop: true, volume: 0.25 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'MoonshadowHamlet_tiledmap' });
      this.tilemap.addTilesetImage('KE_Ground_Tiles', 'KE_Ground_Tiles_tileset');
      this.tilemap.addTilesetImage('KE_Town', 'KE_Town_tileset');
      this.tilemap.addTilesetImage('RW_Forest', 'RW_Forest_tileset');
      this.tilemap.addTilesetImage('RW_Plains', 'RW_Plains_tileset');
      this.tilemap.addTilesetImage('KE_Water_Tiles', 'KE_Water_Tiles_tileset');
      this.tilemap.addTilesetImage('RW_Graveyard', 'RW_Graveyard_tileset');
      this.initializeTilemap([
         'KE_Ground_Tiles',
         'KE_Town',
         'RW_Forest',
         'RW_Plains',
         'KE_Water_Tiles',
         'RW_Graveyard',
      ]);

      return this.tilemap;
   }
}
