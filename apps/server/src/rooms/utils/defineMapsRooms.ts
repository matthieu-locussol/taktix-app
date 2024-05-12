import { Server } from '@colyseus/core';
import { CloudsRoom } from '../maps/CloudsRoom';
import { DungeonRoom } from '../maps/DungeonRoom';
import { ForestRoom } from '../maps/ForestRoom';
import { HouseRoom } from '../maps/HouseRoom';
import { MoonshadowHamletRoom } from '../maps/MoonshadowHamletRoom';
import { MoonshadowHotelRoom } from '../maps/MoonshadowHotelRoom';
import { MoonshadowInnRoom } from '../maps/MoonshadowInnRoom';

export const defineMapsRooms = (gameServer: Server) => {
   gameServer.define('CloudsRoom', CloudsRoom);
   gameServer.define('DungeonRoom', DungeonRoom);
   gameServer.define('ForestRoom', ForestRoom);
   gameServer.define('HouseRoom', HouseRoom);
   gameServer.define('MoonshadowHamletRoom', MoonshadowHamletRoom);
   gameServer.define('MoonshadowHotelRoom', MoonshadowHotelRoom);
   gameServer.define('MoonshadowInnRoom', MoonshadowInnRoom);
};
