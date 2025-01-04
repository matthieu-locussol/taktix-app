import type { MonsterSprite } from 'shared/src/data/monstersSprites';

import { EntityType } from '../../utils/phaser';
import { SCALE_FACTOR, type Scene } from '../Scene';

import { registerSpriteEvents } from './registerSpriteEvents';

interface MakeMonsterProps {
   scene: Scene;
   spritesheet: MonsterSprite;
   id: string;
   name: string;
   fightId: number;
}

export const makeMonster = ({ spritesheet, id, name, scene, fightId }: MakeMonsterProps) => {
   if (scene.gridEngine.getAllCharacters().find((characterId) => characterId === id)) {
      return null;
   }

   const monsterSprite = scene.add.sprite(0, 0, spritesheet);

   monsterSprite.setPipeline('Light2D');
   monsterSprite.scale = SCALE_FACTOR;
   monsterSprite.setData('id', id);
   monsterSprite.setData('fightId', fightId);
   monsterSprite.setData('type', EntityType.Monster);
   monsterSprite.setName(name);
   registerSpriteEvents(monsterSprite);

   if (scene.minimap !== null) {
      scene.minimap.ignore(monsterSprite);
   }

   return monsterSprite;
};
