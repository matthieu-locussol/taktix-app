// This file has been automatically generated. DO NOT edit it manually.

import type { Room } from '../types/Room';
import { Direction } from '../types/SceneData';
import type { TeleportationPlace } from '../types/TeleportationPlace';

export const TELEPORTATION_PLACES: Record<Room, TeleportationPlace | null> = {
   AAA_InitialRoom: null,
   CloudsRoom: {
      x: 10,
      y: 11,
      direction: Direction.LEFT,
      price: 120,
   },
   DungeonRoom: null,
   ForestRoom: {
      x: 13,
      y: 39,
      direction: Direction.DOWN,
      price: 230,
   },
   HouseRoom: null,
   MoonshadowHamletRoom: {
      x: 35,
      y: 33,
      direction: Direction.RIGHT,
      price: 120,
   },
   MoonshadowHotelRoom: null,
   MoonshadowInnRoom: null,
};
