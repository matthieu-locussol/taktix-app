import { CHARACTER_HEIGHT, CHARACTER_WIDTH, Scene } from '../Scene';
import { loadCharactersAssets } from '../utils/loadCharactersAssets';
import { loadMonstersAssets } from '../utils/loadMonstersAssets';

export class DungeonScene extends Scene {
   constructor() {
      super('DungeonRoom');
   }

   public loadAssets(): void {
      this.load.audio('Dungeon_music', '/assets/musics/Dungeon.mp3');
      this.load.image('Dungeon Indoor_tileset', '/assets/tilesets/dungeon_indoor.png');
      this.load.image('Dungeon Outdoor_tileset', '/assets/tilesets/dungeon_outdoor.png');
      this.load.tilemapTiledJSON('Dungeon_tiledmap', '/assets/maps/Dungeon.json');
      loadCharactersAssets(this);
      loadMonstersAssets(this);
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('Dungeon_music', { loop: true, volume: 0.5 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'Dungeon_tiledmap' });
      this.tilemap.addTilesetImage('Dungeon Indoor', 'Dungeon Indoor_tileset');
      this.tilemap.addTilesetImage('Dungeon Outdoor', 'Dungeon Outdoor_tileset');
      this.initializeTilemap(['Dungeon Indoor', 'Dungeon Outdoor']);

      return this.tilemap;
   }
}
