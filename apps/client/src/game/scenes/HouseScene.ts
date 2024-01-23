import { Scene } from '../Scene';

export class HouseScene extends Scene {
   constructor() {
      super('HouseRoom');
   }

   public loadAssets(): void {
      this.load.audio('house', '/assets/musics/house.mp3');
      this.load.image('house_tiles', '/assets/tilesets/house_tileset.png');
      this.load.tilemapTiledJSON('house-map', '/assets/maps/house.json');
      this.load.spritesheet('player', '/assets/characters/characters.png', {
         frameWidth: 26,
         frameHeight: 36,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('house', { loop: true, volume: 0.05 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'house-map' });
      this.tilemap.addTilesetImage('House', 'house_tiles');
      this.initializeTilemap(['House']);

      return this.tilemap;
   }
}
