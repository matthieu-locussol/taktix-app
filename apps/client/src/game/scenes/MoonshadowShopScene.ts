import { Scene } from '../Scene.ts';
import { loadCharactersAssets } from '../utils/loadCharactersAssets.ts';
import { loadMonstersAssets } from '../utils/loadMonstersAssets.ts';

export class MoonshadowShopScene extends Scene {
   constructor() {
      super('MoonshadowShopRoom');
   }

   public loadAssets(): void {
      this.load.audio('MoonshadowShop_music', '/assets/musics/MoonshadowShop.mp3');
      this.load.image('RW_Interior_tileset', '/assets/tilesets/RW_Interior.png');
      this.load.tilemapTiledJSON('MoonshadowShop_tiledmap', '/assets/maps/MoonshadowShop.json');
      loadCharactersAssets(this);
      loadMonstersAssets(this);
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
