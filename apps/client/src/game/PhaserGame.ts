import { GridEngine } from 'grid-engine';
import Phaser from 'phaser';
import { store } from '../store';
import { CloudsScene } from './scenes/CloudsScene';
import { HouseScene } from './scenes/HouseScene';

export const config: Phaser.Types.Core.GameConfig = {
   type: Phaser.AUTO,
   backgroundColor: '#1f2937',
   parent: 'root-game',
   scene: [CloudsScene, HouseScene],
   pixelArt: true,
   scale: {
      mode: Phaser.Scale.ScaleModes.ENVELOP,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
   },
   disableContextMenu: true,
   plugins: {
      scene: [
         {
            key: 'gridEngine',
            plugin: GridEngine,
            mapping: 'gridEngine',
         },
      ],
   },
   callbacks: {
      postBoot: () => store.gameStore.initialize(game),
   },
};

export const game = new Phaser.Game(config);
