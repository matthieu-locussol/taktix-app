import { Scene } from '../Scene';

export class ForestScene extends Scene {
   constructor() {
      super('ForestRoom');
   }

   public loadAssets(): void {
      this.load.audio('Forest_music', '/assets/musics/Forest.mp3');
      this.load.image('Cloud City_tileset', '/assets/tilesets/cloud_tileset.png');
      this.load.image('forest_trees_tileset', '/assets/tilesets/forest_trees.png');
      this.load.image('forest_ground_tileset', '/assets/tilesets/forest_ground.png');
      this.load.image('forest_props_tileset', '/assets/tilesets/forest_props.png');
      this.load.tilemapTiledJSON('Forest_tiledmap', '/assets/maps/Forest.json');
   }

   public unloadAssets(): void {
      this.sound.removeByKey('Forest_music');
      this.textures.remove('Cloud City_tileset');
      this.textures.remove('forest_trees_tileset');
      this.textures.remove('forest_ground_tileset');
      this.textures.remove('forest_props_tileset');

      if (this.tilemap !== null) {
         this.tilemap.destroy();
      }
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('Forest_music', { loop: true, volume: 0.05 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: 'Forest_tiledmap' });
      this.tilemap.addTilesetImage('Cloud City', 'Cloud City_tileset');
      this.tilemap.addTilesetImage('forest_trees', 'forest_trees_tileset');
      this.tilemap.addTilesetImage('forest_ground', 'forest_ground_tileset');
      this.tilemap.addTilesetImage('forest_props', 'forest_props_tileset');
      this.initializeTilemap(['Cloud City', 'forest_trees', 'forest_ground', 'forest_props']);

      return this.tilemap;
   }
}
