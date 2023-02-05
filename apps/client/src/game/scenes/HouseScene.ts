import { Scene } from '../Scene';

export class HouseScene extends Scene {
   constructor() {
      super('house');
   }

   public loadAssets(): void {
      this.load.audio('background', '/assets/musics/background.mp3');
      this.load.image('house_tiles', '/assets/tilesets/house_tileset.png');
      this.load.tilemapTiledJSON('house-map', '/assets/maps/house.json');
      this.load.spritesheet('player', '/assets/characters/characters.png', {
         frameWidth: 26,
         frameHeight: 36,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      const houseTilemap = this.make.tilemap({ key: 'house-map' });
      houseTilemap.addTilesetImage('House', 'house_tiles');

      for (let i = 0; i < houseTilemap.layers.length; i += 1) {
         const layer = houseTilemap.createLayer(i, 'House', 0, 0);
         layer.setDepth(i);
         layer.scale = 3;
      }

      return houseTilemap;
   }
}
