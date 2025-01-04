// This file has been automatically generated. DO NOT edit it manually.

import type { Room } from '../types/Room.ts';
import type { TeleportationPlace } from '../types/TeleportationPlace.ts';

import { Direction } from '../types/SceneData.ts';

export const TELEPORTATION_PLACES: Record<Room, TeleportationPlace | null> = {
   AAA_InitialRoom: null,
   GraveyardRoom: {
      x: 15,
      y: 21,
      direction: Direction.RIGHT,
      price: 200,
   },
   MoonshadowBarRoom: null,
   MoonshadowHamletRoom: {
      x: 35,
      y: 33,
      direction: Direction.RIGHT,
      price: 120,
   },
   MoonshadowHotelRoom: null,
   MoonshadowInnRoom: null,
   MoonshadowShopRoom: null,
};
