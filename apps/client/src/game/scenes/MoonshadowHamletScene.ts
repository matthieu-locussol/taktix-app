import { Scene } from '../Scene';
import { loadCharactersAssets } from '../utils/loadCharactersAssets';
import { loadMonstersAssets } from '../utils/loadMonstersAssets';

export class MoonshadowHamletScene extends Scene {
   constructor() {
      super('MoonshadowHamletRoom');
   }

   public loadAssets(): void {
      this.load.audio('MoonshadowHamlet_music', '/assets/musics/MoonshadowHamlet.mp3');
      this.load.image('KE_Ground_Tiles_tileset', '/assets/tilesets/KE_Ground_Tiles.png');
      this.load.image('KE_Town_tileset', '/assets/tilesets/KE_Town.png');
      this.load.image('RW_Forest_tileset', '/assets/tilesets/RW_Forest.png');
      this.load.image('RW_Plains_tileset', '/assets/tilesets/RW_Plains.png');
      this.load.image('KE_Water_Tiles_tileset', '/assets/tilesets/KE_Water_Tiles.png');
      this.load.image('RW_Graveyard_tileset', '/assets/tilesets/RW_Graveyard.png');
      this.load.tilemapTiledJSON('MoonshadowHamlet_tiledmap', '/assets/maps/MoonshadowHamlet.json');
      loadCharactersAssets(this);
      loadMonstersAssets(this);
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
