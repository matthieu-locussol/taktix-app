import {
   CHARACTER_LETTER_WIDTH,
   CHARACTER_WIDTH,
   SCALE_FACTOR,
   TILE_SIZE,
   type Scene,
} from '../Scene';

export const makeCharacter = (scene: Scene, name: string, isPlayer: boolean) => {
   if (scene.gridEngine.getAllCharacters().find((playerName) => playerName === name)) {
      return null;
   }

   const characterSprite = scene.add.sprite(0, 0, 'player');
   characterSprite.setPipeline('Light2D');
   characterSprite.scale = SCALE_FACTOR;

   const offsetX = (CHARACTER_WIDTH * SCALE_FACTOR - name.length * CHARACTER_LETTER_WIDTH) / 2;
   const characterName = scene.add.text(offsetX, -CHARACTER_LETTER_WIDTH, name, {
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
   characterName.scale = SCALE_FACTOR;

   const characterSquare = scene.add
      .graphics({
         fillStyle: { color: isPlayer ? 0xff0000 : 0x00ff00 },
      })
      .fillRect(0, 0, TILE_SIZE * SCALE_FACTOR, TILE_SIZE * SCALE_FACTOR)
      .setDepth(999);

   const externalPlayerContainer = scene.add.container(0, 0, [
      characterName,
      characterSprite,
      characterSquare,
   ]);

   if (scene.minimap !== null) {
      scene.minimap.ignore(characterName);
      scene.minimap.ignore(characterSprite);
   }

   scene.cameras.main.ignore(characterSquare);

   return { sprite: characterSprite, container: externalPlayerContainer };
};
