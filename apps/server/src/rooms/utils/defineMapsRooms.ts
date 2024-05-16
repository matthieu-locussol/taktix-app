import { Server } from '@colyseus/core';
import { MoonshadowBarRoom } from '../maps/MoonshadowBarRoom';
import { MoonshadowHamletRoom } from '../maps/MoonshadowHamletRoom';
import { MoonshadowHotelRoom } from '../maps/MoonshadowHotelRoom';
import { MoonshadowInnRoom } from '../maps/MoonshadowInnRoom';

export const defineMapsRooms = (gameServer: Server) => {
   gameServer.define('MoonshadowBarRoom', MoonshadowBarRoom);
   gameServer.define('MoonshadowHamletRoom', MoonshadowHamletRoom);
   gameServer.define('MoonshadowHotelRoom', MoonshadowHotelRoom);
   gameServer.define('MoonshadowInnRoom', MoonshadowInnRoom);
};
