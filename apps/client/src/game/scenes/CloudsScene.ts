import { Direction } from 'grid-engine';
import { Scene } from '../Scene';

export class CloudsScene extends Scene {
   constructor() {
      super('clouds', { entrancePosition: { x: 12, y: 7 }, entranceDirection: Direction.DOWN });
   }

   public loadAssets() {
      this.load.audio('background', '/assets/musics/background.mp3');
      this.load.image('tiles', '/assets/tilesets/cloud_tileset.png');
      this.load.tilemapTiledJSON('cloud-city-map', '/assets/maps/clouds_1.json');
      this.load.spritesheet('player', '/assets/characters/characters.png', {
         frameWidth: 26,
         frameHeight: 36,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.play('background', { loop: true, volume: 0.05 });

      const cloudCityTilemap = this.make.tilemap({ key: 'cloud-city-map' });
      cloudCityTilemap.addTilesetImage('Cloud City', 'tiles');

      for (let i = 0; i < cloudCityTilemap.layers.length; i += 1) {
         const layer = cloudCityTilemap.createLayer(i, 'Cloud City', 0, 0);
         layer.setDepth(i);
         layer.scale = 3;
      }

      return cloudCityTilemap;
   }
}
