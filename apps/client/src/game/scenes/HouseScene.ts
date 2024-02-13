import { CHARACTER_HEIGHT, CHARACTER_WIDTH, Scene } from '../Scene';

export class HouseScene extends Scene {
   constructor() {
      super('HouseRoom');
   }

   public loadAssets(): void {
      this.load.audio('House_music', '/assets/musics/House.mp3');
      this.load.image('House_tileset', '/assets/tilesets/house_tileset.png');
      this.load.image('Clouds_tileset', '/assets/tilesets/cloud_tileset.png');
      this.load.tilemapTiledJSON('House_tiledmap', '/assets/maps/House.json');
      this.load.spritesheet('PlayerSpritesheet', '/assets/characters/characters.png', {
         frameWidth: CHARACTER_WIDTH,
         frameHeight: CHARACTER_HEIGHT,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('House_music', { loop: true, volume: 0.5 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'House_tiledmap' });
      this.tilemap.addTilesetImage('House', 'House_tileset');
      this.tilemap.addTilesetImage('Clouds', 'Clouds_tileset');
      this.initializeTilemap(['House', 'Clouds']);

      return this.tilemap;
   }
}
