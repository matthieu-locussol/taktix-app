import { CHARACTER_LETTER_WIDTH, CHARACTER_WIDTH, SCALE_FACTOR, type Scene } from '../Scene';

export const makeCharacter = (scene: Scene, name: string) => {
   if (scene.gridEngine.getAllCharacters().find((playerName) => playerName === name)) {
      return null;
   }

   const externalPlayerSprite = scene.add.sprite(0, 0, 'player');
   externalPlayerSprite.setPipeline('Light2D');
   externalPlayerSprite.scale = SCALE_FACTOR;

   const offsetX = (CHARACTER_WIDTH * SCALE_FACTOR - name.length * CHARACTER_LETTER_WIDTH) / 2;
   const externalPlayerName = scene.add.text(offsetX, -CHARACTER_LETTER_WIDTH, name, {
      align: 'center',
      fontSize: 6,
      fontFamily: 'Orbitron',
      resolution: 4,
      shadow: {
         offsetX: 0,
         offsetY: 0,
         color: '#000000',
         blur: 2,
         stroke: true,
         fill: true,
      },
   });
   externalPlayerName.scale = SCALE_FACTOR;

   const externalPlayerContainer = scene.add.container(0, 0, [
      externalPlayerName,
      externalPlayerSprite,
   ]);

   if (scene.minimap !== null) {
      scene.minimap.ignore(externalPlayerContainer);
   }

   return { sprite: externalPlayerSprite, container: externalPlayerContainer };
};
