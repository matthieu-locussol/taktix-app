import { SCALE_FACTOR } from '../Scene.ts';

export const makeCharacterName = (scene: Phaser.Scene, name: string, color: string) => {
   const characterName = scene.add
      .text(0, 0, name, {
         align: 'center',
         fontSize: 6,
         fontFamily: 'Orbitron',
         resolution: 32,
         color,
         shadow: {
            offsetX: 0,
            offsetY: 0,
            color: '#000000',
            blur: 2,
            stroke: true,
            fill: true,
         },
         strokeThickness: 1,
         stroke: '#000000',
      })
      .setDepth(999)
      .setScale(SCALE_FACTOR);

   return characterName;
};
