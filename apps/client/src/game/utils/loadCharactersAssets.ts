import type { Scene } from 'phaser';
import { charactersSprites } from 'shared/src/data/charactersSprites';
import { CHARACTER_HEIGHT, CHARACTER_WIDTH } from '../Scene';

export const loadCharactersAssets = async (scene: Scene) => {
   charactersSprites.forEach((name) => {
      scene.load.spritesheet(name, `/assets/characters/${name}.png`, {
         frameWidth: CHARACTER_WIDTH,
         frameHeight: CHARACTER_HEIGHT,
      });
   });
};
