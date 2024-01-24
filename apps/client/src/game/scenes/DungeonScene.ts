import { Scene } from '../Scene';

export class DungeonScene extends Scene {
   constructor() {
      super('DungeonRoom');
   }

   public loadAssets(): void {
      this.load.audio('Dungeon_music', '/assets/musics/Dungeon.mp3');
      this.load.image('Dungeon Indoor_tileset', '/assets/tilesets/dungeon_indoor.png');
      this.load.image('Dungeon Outdoor 2_tileset', '/assets/tilesets/dungeon_outdoor_2.png');
      this.load.image('Dungeon Outdoor_tileset', '/assets/tilesets/dungeon_outdoor.png');
      this.load.tilemapTiledJSON('Dungeon_tiledmap', '/assets/maps/Dungeon.json');
      this.load.spritesheet('player', '/assets/characters/characters.png', {
         frameWidth: 26,
         frameHeight: 36,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('Dungeon_music', { loop: true, volume: 0.05 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'Dungeon_tiledmap' });
      this.tilemap.addTilesetImage('Dungeon Indoor', 'Dungeon Indoor_tileset');
      this.tilemap.addTilesetImage('Dungeon Outdoor 2', 'Dungeon Outdoor 2_tileset');
      this.tilemap.addTilesetImage('Dungeon Outdoor', 'Dungeon Outdoor_tileset');
      this.initializeTilemap(['Dungeon Indoor', 'Dungeon Outdoor 2', 'Dungeon Outdoor']);

      return this.tilemap;
   }
}
