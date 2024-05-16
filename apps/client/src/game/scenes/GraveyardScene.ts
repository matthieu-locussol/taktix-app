import { CHARACTER_HEIGHT, CHARACTER_WIDTH, Scene } from '../Scene';
import { loadCharactersAssets } from '../utils/loadCharactersAssets';
import { loadMonstersAssets } from '../utils/loadMonstersAssets';

export class GraveyardScene extends Scene {
   constructor() {
      super('GraveyardRoom');
   }

   public loadAssets(): void {
      this.load.audio('Graveyard_music', '/assets/musics/Graveyard.mp3');
      this.load.image('RW_Graveyard_tileset', '/assets/tilesets/RW_Graveyard.png');
      this.load.image('KE_Ground_Tiles_tileset', '/assets/tilesets/KE_Ground_Tiles.png');
      this.load.tilemapTiledJSON('Graveyard_tiledmap', '/assets/maps/Graveyard.json');
      loadCharactersAssets(this);
      loadMonstersAssets(this);
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
