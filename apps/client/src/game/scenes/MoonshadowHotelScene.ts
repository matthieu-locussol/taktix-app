import { Scene } from '../Scene.ts';
import { loadCharactersAssets } from '../utils/loadCharactersAssets.ts';
import { loadMonstersAssets } from '../utils/loadMonstersAssets.ts';

export class MoonshadowHotelScene extends Scene {
   constructor() {
      super('MoonshadowHotelRoom');
   }

   public loadAssets(): void {
      this.load.audio('MoonshadowHotel_music', '/assets/musics/MoonshadowHotel.mp3');
      this.load.image('FDR_Interior_tileset', '/assets/tilesets/FDR_Interior.png');
      this.load.tilemapTiledJSON('MoonshadowHotel_tiledmap', '/assets/maps/MoonshadowHotel.json');
      loadCharactersAssets(this);
      loadMonstersAssets(this);
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('MoonshadowHotel_music', { loop: true, volume: 0.25 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'MoonshadowHotel_tiledmap' });
      this.tilemap.addTilesetImage('FDR_Interior', 'FDR_Interior_tileset');
      this.initializeTilemap(['FDR_Interior']);

      return this.tilemap;
   }
}
