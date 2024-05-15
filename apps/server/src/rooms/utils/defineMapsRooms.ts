import { Server } from '@colyseus/core';
import { MoonshadowHamletRoom } from '../maps/MoonshadowHamletRoom';
import { MoonshadowHotelRoom } from '../maps/MoonshadowHotelRoom';
import { MoonshadowInnRoom } from '../maps/MoonshadowInnRoom';

export const defineMapsRooms = (gameServer: Server) => {
   gameServer.define('MoonshadowHamletRoom', MoonshadowHamletRoom);
   gameServer.define('MoonshadowHotelRoom', MoonshadowHotelRoom);
   gameServer.define('MoonshadowInnRoom', MoonshadowInnRoom);
};
