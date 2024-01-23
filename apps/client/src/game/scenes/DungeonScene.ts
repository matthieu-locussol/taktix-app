import { Scene } from '../Scene';

export class DungeonScene extends Scene {
   constructor() {
      super('DungeonRoom');
   }

   public loadAssets(): void {
      this.load.audio('dungeon', '/assets/musics/house.mp3');
      this.load.image('dungeon_indoor', '/assets/tilesets/dungeon_indoor.png');
      this.load.image('dungeon_outdoor', '/assets/tilesets/dungeon_outdoor.png');
      this.load.image('dungeon_outdoor_2', '/assets/tilesets/dungeon_outdoor_2.png');
      this.load.tilemapTiledJSON('dungeon-map', '/assets/maps/dungeon.json');
      this.load.spritesheet('player', '/assets/characters/characters.png', {
         frameWidth: 26,
         frameHeight: 36,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('dungeon', { loop: true, volume: 0.05 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'dungeon-map' });
      this.tilemap.addTilesetImage('Dungeon Indoor', 'dungeon_indoor');
      this.tilemap.addTilesetImage('Dungeon Outdoor', 'dungeon_outdoor');
      this.tilemap.addTilesetImage('Dungeon Outdoor 2', 'dungeon_outdoor_2');
      this.initializeTilemap(['Dungeon Indoor', 'Dungeon Outdoor', 'Dungeon Outdoor 2']);

      return this.tilemap;
   }
}
