import type { Scene } from 'phaser';

import { monstersSprites, monstersSpritesData } from 'shared/src/data/monstersSprites.ts';

export const loadMonstersAssets = async (scene: Scene) => {
   monstersSprites.forEach((name) => {
      scene.load.spritesheet(name, `/assets/monsters/${name}.png`, {
         frameWidth: monstersSpritesData[name].frameWidth,
         frameHeight: monstersSpritesData[name].frameHeight,
      });
   });
};
