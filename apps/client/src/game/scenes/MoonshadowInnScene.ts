import { CHARACTER_HEIGHT, CHARACTER_WIDTH, Scene } from '../Scene';
import { loadCharactersAssets } from '../utils/loadCharactersAssets';
import { loadMonstersAssets } from '../utils/loadMonstersAssets';

export class MoonshadowInnScene extends Scene {
   constructor() {
      super('MoonshadowInnRoom');
   }

   public loadAssets(): void {
      this.load.audio('MoonshadowInn_music', '/assets/musics/MoonshadowInn.mp3');
      this.load.image('FDR_Interior_tileset', '/assets/tilesets/FDR_Interior.png');
      this.load.tilemapTiledJSON('MoonshadowInn_tiledmap', '/assets/maps/MoonshadowInn.json');
      loadCharactersAssets(this);
      loadMonstersAssets(this);
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('MoonshadowInn_music', { loop: true, volume: 0.5 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'MoonshadowInn_tiledmap' });
      this.tilemap.addTilesetImage('FDR_Interior', 'FDR_Interior_tileset');
      this.initializeTilemap(['FDR_Interior']);

      return this.tilemap;
   }
}
