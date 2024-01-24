import { Scene } from '../Scene';

export class CloudsScene extends Scene {
   constructor() {
      super('CloudsRoom');
   }

   public loadAssets() {
      this.load.audio('background', '/assets/musics/background.mp3');
      this.load.image('tiles', '/assets/tilesets/cloud_tileset.png');
      this.load.tilemapTiledJSON('cloud-city-map', '/assets/maps/clouds.json');
      this.load.spritesheet('player', '/assets/characters/characters.png', {
         frameWidth: 26,
         frameHeight: 36,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('background', { loop: true, volume: 0.05 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'cloud-city-map' });
      this.tilemap.addTilesetImage('Cloud City', 'tiles');
      this.initializeTilemap(['Cloud City']);

      return this.tilemap;
   }
}
