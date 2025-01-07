import { Scene } from 'phaser';
import { animationFilesData } from 'shared/src/data/animations';
import { AnimationFile } from 'shared/src/types/Animation';

import { store } from '../../../store';
import { loadCharactersAssets } from '../../utils/loadCharactersAssets';
import { loadMonstersAssets } from '../../utils/loadMonstersAssets';

export class Boot extends Scene {
   constructor() {
      super('Boot');
   }

   preload() {
      const { loadingScreenStore } = store;

      this.load.on('start', () => {
         loadingScreenStore.setLoadingAssets(true);
      });

      this.load.on('progress', (value: number) => {
         loadingScreenStore.setProgress(value);
      });

      this.load.on('fileprogress', (file: Phaser.Loader.File) => {
         loadingScreenStore.setCurrentAssetPath(file.src);
      });

      this.load.on('complete', () => {
         loadingScreenStore.setLoadingAssets(false);
      });

      this.load.audio('AAA_Initial_music', '/assets/musics/Menu.mp3');
      this.load.audio('Graveyard_music', '/assets/musics/Graveyard.mp3');
      this.load.audio('MoonshadowBar_music', '/assets/musics/MoonshadowBar.mp3');
      this.load.audio('MoonshadowHamlet_music', '/assets/musics/MoonshadowHamlet.mp3');
      this.load.audio('MoonshadowHotel_music', '/assets/musics/MoonshadowHotel.mp3');
      this.load.audio('MoonshadowInn_music', '/assets/musics/MoonshadowInn.mp3');
      this.load.audio('MoonshadowShop_music', '/assets/musics/MoonshadowShop.mp3');
      this.load.audio('PvEFight', '/assets/musics/PvEFight.mp3');

      this.load.image('RW_Graveyard_tileset', '/assets/tilesets/RW_Graveyard.png');
      this.load.image('KE_Ground_Tiles_tileset', '/assets/tilesets/KE_Ground_Tiles.png');
      this.load.image('RW_Interior_tileset', '/assets/tilesets/RW_Interior.png');
      this.load.image('KE_Town_tileset', '/assets/tilesets/KE_Town.png');
      this.load.image('RW_Forest_tileset', '/assets/tilesets/RW_Forest.png');
      this.load.image('RW_Plains_tileset', '/assets/tilesets/RW_Plains.png');
      this.load.image('KE_Water_Tiles_tileset', '/assets/tilesets/KE_Water_Tiles.png');
      this.load.image('FDR_Interior_tileset', '/assets/tilesets/FDR_Interior.png');
      this.load.image('background', '/assets/fights/mountains/background.png');
      this.load.image('foreground-trees', '/assets/fights/mountains/foreground-trees.png');
      this.load.image('mountain-far', '/assets/fights/mountains/mountain-far.png');
      this.load.image('mountains', '/assets/fights/mountains/mountains.png');
      this.load.image('trees', '/assets/fights/mountains/trees.png');
      this.load.image('FightIcon', 'assets/fights/fight.png');

      this.load.tilemapTiledJSON('Graveyard_tiledmap', '/assets/maps/Graveyard.json');
      this.load.tilemapTiledJSON('MoonshadowBar_tiledmap', '/assets/maps/MoonshadowBar.json');
      this.load.tilemapTiledJSON('MoonshadowHamlet_tiledmap', '/assets/maps/MoonshadowHamlet.json');
      this.load.tilemapTiledJSON('MoonshadowHotel_tiledmap', '/assets/maps/MoonshadowHotel.json');
      this.load.tilemapTiledJSON('MoonshadowInn_tiledmap', '/assets/maps/MoonshadowInn.json');
      this.load.tilemapTiledJSON('MoonshadowShop_tiledmap', '/assets/maps/MoonshadowShop.json');

      Object.values(AnimationFile).forEach((animationFile) => {
         const { frameHeight, frameWidth, path, id } = animationFilesData[animationFile];

         this.load.spritesheet(id, path, { frameWidth, frameHeight });
      });

      loadCharactersAssets(this);
      loadMonstersAssets(this);
   }

   create() {
      this.scene.start('AAA_InitialRoom');
   }
}
