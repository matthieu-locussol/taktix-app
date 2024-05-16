import { Server } from '@colyseus/core';
import { GraveyardRoom } from '../maps/GraveyardRoom';
import { MoonshadowBarRoom } from '../maps/MoonshadowBarRoom';
import { MoonshadowHamletRoom } from '../maps/MoonshadowHamletRoom';
import { MoonshadowHotelRoom } from '../maps/MoonshadowHotelRoom';
import { MoonshadowInnRoom } from '../maps/MoonshadowInnRoom';
import { MoonshadowShopRoom } from '../maps/MoonshadowShopRoom';

export const defineMapsRooms = (gameServer: Server) => {
   gameServer.define('GraveyardRoom', GraveyardRoom);
   gameServer.define('MoonshadowBarRoom', MoonshadowBarRoom);
   gameServer.define('MoonshadowHamletRoom', MoonshadowHamletRoom);
   gameServer.define('MoonshadowHotelRoom', MoonshadowHotelRoom);
   gameServer.define('MoonshadowInnRoom', MoonshadowInnRoom);
   gameServer.define('MoonshadowShopRoom', MoonshadowShopRoom);
};
