import { EntityType } from '../../utils/phaser';
import { SCALE_FACTOR, type Scene, TILE_SIZE } from '../Scene';
import { registerSpriteEvents } from './registerSpriteEvents';

type CharacterType = 'player' | 'externalPlayer' | 'npc';
interface MakeCharacterProps {
   scene: Scene;
   name: string;
   characterType: CharacterType;
}

export const makeCharacter = ({ characterType, name, scene }: MakeCharacterProps) => {
   if (scene.gridEngine.getAllCharacters().find((playerName) => playerName === name)) {
      return null;
   }

   const characterSprite = scene.add.sprite(0, 0, 'PlayerSpritesheet');
   characterSprite.setPipeline('Light2D');
   characterSprite.scale = SCALE_FACTOR;
   characterSprite.setName(name);
   characterSprite.setData('type', characterType === 'npc' ? EntityType.NPC : EntityType.Character);
   registerSpriteEvents(characterSprite);

   const characterName = scene.add
      .text(0, 0, name, {
         align: 'center',
         fontSize: 6,
         fontFamily: 'Orbitron',
         resolution: 4,
         color: {
            player: '#ffffff',
            externalPlayer: '#ffffff',
            npc: '#00ff00',
         }[characterType],
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
      .setDepth(999);
   characterName.scale = SCALE_FACTOR;

   const characterSquare = scene.add
      .rectangle(
         0,
         0,
         TILE_SIZE * SCALE_FACTOR,
         TILE_SIZE * SCALE_FACTOR,
         {
            player: 0xff0000,
            externalPlayer: 0x00ff00,
            npc: 0x0000ff,
         }[characterType],
      )
      .setDepth(999);

   if (scene.minimap !== null) {
      scene.minimap.ignore(characterName);
      scene.minimap.ignore(characterSprite);
   }

   scene.cameras.main.ignore(characterSquare);

   return {
      sprite: characterSprite,
      wrapper: {
         name: characterName,
         square: characterSquare,
      },
   };
};
