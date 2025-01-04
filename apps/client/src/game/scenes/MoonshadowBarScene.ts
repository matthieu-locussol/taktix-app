import { Scene } from '../Scene';
import { loadCharactersAssets } from '../utils/loadCharactersAssets';
import { loadMonstersAssets } from '../utils/loadMonstersAssets';

export class MoonshadowBarScene extends Scene {
   constructor() {
      super('MoonshadowBarRoom');
   }

   public loadAssets(): void {
      this.load.audio('MoonshadowBar_music', '/assets/musics/MoonshadowBar.mp3');
      this.load.image('RW_Interior_tileset', '/assets/tilesets/RW_Interior.png');
      this.load.tilemapTiledJSON('MoonshadowBar_tiledmap', '/assets/maps/MoonshadowBar.json');
      loadCharactersAssets(this);
      loadMonstersAssets(this);
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
