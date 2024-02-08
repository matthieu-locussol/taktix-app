import { Scene } from '../Scene';

export class DungeonScene extends Scene {
   constructor() {
      super('DungeonRoom');
   }

   public loadAssets(): void {
      this.load.audio('Dungeon_music', '/assets/musics/Dungeon.mp3');
      this.load.image('Dungeon Indoor_tileset', '/assets/tilesets/dungeon_indoor.png');
      this.load.image('Dungeon Outdoor_tileset', '/assets/tilesets/dungeon_outdoor.png');
      this.load.tilemapTiledJSON('Dungeon_tiledmap', '/assets/maps/Dungeon.json');
   }

   public unloadAssets(): void {
      this.sound.removeByKey('Dungeon_music');
      this.textures.remove('Dungeon Indoor_tileset');
      this.textures.remove('Dungeon Outdoor_tileset');

      if (this.tilemap !== null) {
         this.tilemap.destroy();
      }
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
