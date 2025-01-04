import type { Position } from 'shared/src/types/SceneData';
import type { Store } from '../store/Store';

import { MoveToResult, NoPathFoundStrategy, PathBlockedStrategy } from 'grid-engine';
import { TILE_SIZE } from 'shared/src/config';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { z } from 'zod';

import { SCALE_FACTOR } from '../game/Scene';

export enum EntityType {
   Character = 'Character',
   NPC = 'NPC',
   Monster = 'Monster',
}

export const zEntityType = z.nativeEnum(EntityType);

export const zObjectProperties = z.array(
   z.object({
      name: z.string(),
      value: z.string(),
   }),
);

export type ObjectProperties = z.infer<typeof zObjectProperties>;

export const isObjectProperties = (value: unknown): value is ObjectProperties =>
   zObjectProperties.safeParse(value).success;

export const moveToShape = (
   store: Store,
   shape: Phaser.GameObjects.Components.Transform,
   callback: () => void,
) => {
   const worldPosition: Position = {
      x: Math.round(shape.x / (TILE_SIZE * SCALE_FACTOR)),
      y: Math.round(shape.y / (TILE_SIZE * SCALE_FACTOR)),
   };

   store.gameStore.currentScene.gridEngine
      .moveTo(INTERNAL_PLAYER_NAME, worldPosition, {
         algorithm: 'A_STAR',
         noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
         pathBlockedStrategy: PathBlockedStrategy.STOP,
      })
      .subscribe(({ result }) => {
         if (result === MoveToResult.PATH_BLOCKED || MoveToResult.SUCCESS) {
            callback();
         }
      });

   if (store.gameStore.currentScene.sys.isVisible()) {
      store.colyseusStore.movePlayer(worldPosition.x, worldPosition.y);
   }
};
