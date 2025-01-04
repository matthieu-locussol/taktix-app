import type { CharacterSprite } from 'shared/src/data/charactersSprites';

import { TILE_SIZE } from 'shared/src/config.ts';

import { EntityType } from '../../utils/phaser.ts';
import { SCALE_FACTOR, type Scene } from '../Scene.ts';

import { makeCharacterName } from './makeCharacterName.ts';
import { registerSpriteEvents } from './registerSpriteEvents.ts';

type CharacterType = 'player' | 'externalPlayer' | 'npc';
interface MakeCharacterProps {
   scene: Scene;
   spritesheet: CharacterSprite;
   name: string;
   characterType: CharacterType;
}

export const makeCharacter = ({ characterType, spritesheet, name, scene }: MakeCharacterProps) => {
   if (scene.gridEngine.getAllCharacters().find((playerName) => playerName === name)) {
      return null;
   }

   const characterSprite = scene.add.sprite(0, 0, spritesheet);

   characterSprite.setPipeline('Light2D');
   characterSprite.scale = SCALE_FACTOR;
   characterSprite.setName(name);
   characterSprite.setData('type', characterType === 'npc' ? EntityType.NPC : EntityType.Character);
   registerSpriteEvents(characterSprite);

   const nameColor = {
      player: '#ffffff',
      externalPlayer: '#ffffff',
      npc: '#00ff00',
   }[characterType];
   const characterName = makeCharacterName(scene, name, nameColor);

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
