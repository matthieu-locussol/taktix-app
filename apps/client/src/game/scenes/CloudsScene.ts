import { CHARACTER_HEIGHT, CHARACTER_WIDTH, Scene } from '../Scene';
import { loadCharactersAssets } from '../utils/loadCharactersAssets';
import { loadMonstersAssets } from '../utils/loadMonstersAssets';

export class CloudsScene extends Scene {
   constructor() {
      super('CloudsRoom');
   }

   public loadAssets(): void {
      this.load.audio('Clouds_music', '/assets/musics/Clouds.mp3');
      this.load.image('Cloud City_tileset', '/assets/tilesets/cloud_tileset.png');
      this.load.tilemapTiledJSON('Clouds_tiledmap', '/assets/maps/Clouds.json');
      loadCharactersAssets(this);
      loadMonstersAssets(this);
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('Clouds_music', { loop: true, volume: 0.5 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'Clouds_tiledmap' });
      this.tilemap.addTilesetImage('Cloud City', 'Cloud City_tileset');
      this.initializeTilemap(['Cloud City']);

      return this.tilemap;
   }
}
