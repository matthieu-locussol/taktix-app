import { Server } from '@colyseus/core';
import { CloudsRoom } from '../maps/CloudsRoom';
import { DungeonRoom } from '../maps/DungeonRoom';
import { HouseRoom } from '../maps/HouseRoom';

export const defineMapsRooms = (gameServer: Server) => {
   gameServer.define('CloudsRoom', CloudsRoom);
   gameServer.define('DungeonRoom', DungeonRoom);
   gameServer.define('HouseRoom', HouseRoom);
};
