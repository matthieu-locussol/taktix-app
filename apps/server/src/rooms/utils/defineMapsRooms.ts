// This file has been automatically generated. DO NOT edit it manually.

import type { Server } from '@colyseus/core';

import { GraveyardRoom } from '../maps/GraveyardRoom.ts';
import { MoonshadowBarRoom } from '../maps/MoonshadowBarRoom.ts';
import { MoonshadowHamletRoom } from '../maps/MoonshadowHamletRoom.ts';
import { MoonshadowHotelRoom } from '../maps/MoonshadowHotelRoom.ts';
import { MoonshadowInnRoom } from '../maps/MoonshadowInnRoom.ts';
import { MoonshadowShopRoom } from '../maps/MoonshadowShopRoom.ts';

export const defineMapsRooms = (gameServer: Server) => {
   gameServer.define('GraveyardRoom', GraveyardRoom);
   gameServer.define('MoonshadowBarRoom', MoonshadowBarRoom);
   gameServer.define('MoonshadowHamletRoom', MoonshadowHamletRoom);
   gameServer.define('MoonshadowHotelRoom', MoonshadowHotelRoom);
   gameServer.define('MoonshadowInnRoom', MoonshadowInnRoom);
   gameServer.define('MoonshadowShopRoom', MoonshadowShopRoom);
};
