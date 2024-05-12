import { GridEngine } from 'grid-engine';
import Phaser from 'phaser';
import { store } from '../store';
import { getVersion } from '../utils/version';
import { mapsScenes } from './mapsScenes';
import { PvEFightScene } from './scenes/PvEFightScene';

export const config: Phaser.Types.Core.GameConfig = {
   type: Phaser.AUTO,
   backgroundColor: '#1f2937',
   parent: 'root-game',
   fullscreenTarget: 'root-game',
   scene: [...mapsScenes, PvEFightScene],
   pixelArt: true,
   banner: {
      hidePhaser: process.env.NODE_ENV === 'production',
   },
   title: 'Taktix',
   url: 'https://taktix.vercel.app',
   version: getVersion(''),
   scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
   },
   audio: {
      noAudio: process.env.NODE_ENV === 'development',
   },
   fps: {
      smoothStep: true,
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
   render: {
      powerPreference: 'high-performance',
   },
};

export const game = new Phaser.Game(config);
