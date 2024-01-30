import { GridEngine } from 'grid-engine';
import Phaser from 'phaser';
import { store } from '../store';
import { mapsScenes } from './mapsScenes';

const FPS = 60;

export const config: Phaser.Types.Core.GameConfig = {
   type: Phaser.AUTO,
   backgroundColor: '#1f2937',
   parent: 'root-game',
   scene: [...mapsScenes],
   pixelArt: true,
   fps: {
      min: FPS,
      limit: FPS,
      target: FPS,
      smoothStep: true,
   },
   scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
   },
   audio: {
      noAudio: process.env.NODE_ENV === 'development',
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
   canvasStyle: `border: 1px solid #374151;`,
};

export const game = new Phaser.Game(config);
