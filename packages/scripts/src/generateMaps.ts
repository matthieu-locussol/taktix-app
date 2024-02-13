import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Direction, Room, TeleportationSpot, _assert } from 'shared';

interface TiledMapJson {
   name: string;
   layers: {
      name: string;
      objects: {
         properties: {
            name: string;
            type: string;
            value: string;
         }[];
         width: number;
         height: number;
         x: number;
         y: number;
      }[];
   }[];
   tilesets: {
      name: string;
      image: string;
   }[];
}

// TODO: handle teleportation spots
const generateMaps = () => {
   const mapsFolderPath = resolve(__dirname, '../../../apps/client/public/assets/maps');
   const mapsFolder = readdirSync(mapsFolderPath);
   const maps = mapsFolder
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''));

   regenerateSharedRoom(maps);
   generateServerMapsRooms(maps);
   generateClientMapsScenes(maps);
   regenerateTeleportationSpots(maps);
};

const regenerateSharedRoom = (maps: string[]) => {
   const roomDefinitionPath = resolve(__dirname, '../../shared/src/types/Room.ts');
   const roomDefinitionBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
export type Room = 'AAA_InitialRoom' | ${maps.map((map) => `'${map}Room'`).join(' | ')};
`;
   writeFileSync(roomDefinitionPath, roomDefinitionBlob, { flag: 'w' });
   console.log('[Shared] ✅  Regenerated Room.ts');
};

const generateServerMapsRooms = (maps: string[]) => {
   for (const map of maps) {
      const mapRoomPath = resolve(__dirname, `../../../apps/server/src/rooms/maps/${map}Room.ts`);
      const mapRoomBlob = `import { MapRoom } from '../MapRoom';

export class ${map}Room extends MapRoom {
   constructor() {
      super('${map}Room');
   }
}
`;

      if (!existsSync(mapRoomPath)) {
         writeFileSync(mapRoomPath, mapRoomBlob, { flag: 'w' });
         console.log(`[Server] ✨  Generated ${map}Room.ts`);
      }
   }

   const mapsRoomsFolderPath = resolve(__dirname, '../../../apps/server/src/rooms/maps');
   const mapsRoomsFolder = readdirSync(mapsRoomsFolderPath);
   const mapsRooms = mapsRoomsFolder;

   for (const mapRoom of mapsRooms) {
      const mapName = mapRoom.replace('Room.ts', '');

      if (!maps.includes(mapName)) {
         const mapRoomPath = resolve(__dirname, `../../../apps/server/src/rooms/maps/${mapRoom}`);
         unlinkSync(mapRoomPath);
         console.log(`[Server] 🧹  Deleted ${mapRoom}`);
      }
   }

   const defineMapsRoomsPath = resolve(
      __dirname,
      '../../../apps/server/src/rooms/utils/defineMapsRooms.ts',
   );
   const defineMapsRoomsBlob = `import { Server } from '@colyseus/core';
${maps.map((map) => `import { ${map}Room } from '../maps/${map}Room';`).join('\n')}

export const defineMapsRooms = (gameServer: Server) => {
   ${maps.map((map) => `gameServer.define('${map}Room', ${map}Room);`).join('\n   ')}
};
`;

   writeFileSync(defineMapsRoomsPath, defineMapsRoomsBlob, { flag: 'w' });
   console.log('[Server] ✅  Regenerated defineMapsRooms.ts');
};

const generateClientMapsScenes = (maps: string[]) => {
   for (const map of maps) {
      const tiledMapPath = resolve(
         __dirname,
         `../../../apps/client/public/assets/maps/${map}.json`,
      );
      const tiledMapBlob = readFileSync(tiledMapPath, { encoding: 'utf-8' });
      const tiledMap: TiledMapJson = JSON.parse(tiledMapBlob);
      const tiledMapTilesets = tiledMap.tilesets
         .filter(({ name }) => name !== 'Collisions')
         .map(({ name, image }) => ({
            name,
            image: image.replace('../', '/assets/'),
         }));

      const mapScenePath = resolve(
         __dirname,
         `../../../apps/client/src/game/scenes/${map}Scene.ts`,
      );
      const mapSceneBlob = `import { CHARACTER_HEIGHT, CHARACTER_WIDTH, Scene } from '../Scene';

export class ${map}Scene extends Scene {
   constructor() {
      super('${map}Room');
   }

   public loadAssets(): void {
      this.load.audio('${map}_music', '/assets/musics/${map}.mp3');
      ${tiledMapTilesets.map((tileset) => `this.load.image('${tileset.name}_tileset', '${tileset.image}');`).join('\n      ')}
      this.load.tilemapTiledJSON('${map}_tiledmap', '/assets/maps/${map}.json');
      this.load.spritesheet('PlayerSpritesheet', '/assets/characters/characters.png', {
         frameWidth: CHARACTER_WIDTH,
         frameHeight: CHARACTER_HEIGHT,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('${map}_music', { loop: true, volume: 0.5 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap({ key: '${map}_tiledmap' });
      ${tiledMapTilesets.map((tileset) => `this.tilemap.addTilesetImage('${tileset.name}', '${tileset.name}_tileset');`).join('\n      ')}
      this.initializeTilemap([${tiledMapTilesets.map((tileset) => `'${tileset.name}'`).join(', ')}]);

      return this.tilemap;
   }
}
`;

      if (!existsSync(mapScenePath)) {
         writeFileSync(mapScenePath, mapSceneBlob, { flag: 'w' });
         console.log(`[Client] ✨  Generated ${map}Scene.ts`);
      }
   }

   const mapsScenesFilePath = resolve(__dirname, '../../../apps/client/src/game/mapsScenes.ts');
   const mapsScenesBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import { AAA_InitialScene } from './scenes/AAA_InitialScene';
${maps.map((map) => `import { ${map}Scene } from './scenes/${map}Scene';`).join('\n')}

export const mapsScenes: Phaser.Types.Scenes.SceneType[] = [
   AAA_InitialScene,
${maps.map((map) => `   ${map}Scene`).join(',\n')},
];
`;

   writeFileSync(mapsScenesFilePath, mapsScenesBlob, { flag: 'w' });
   console.log('[Client] ✅  Regenerated mapsScenes.ts');
};

const regenerateTeleportationSpots = (maps: string[]) => {
   const teleportationSpots: Record<Room, TeleportationSpot[]> = {} as Record<
      Room,
      TeleportationSpot[]
   >;

   teleportationSpots.AAA_InitialRoom = [];

   for (const map of maps) {
      const tiledMapPath = resolve(
         __dirname,
         `../../../apps/client/public/assets/maps/${map}.json`,
      );
      const tiledMapBlob = readFileSync(tiledMapPath, { encoding: 'utf-8' });
      const tiledMap: TiledMapJson = JSON.parse(tiledMapBlob);

      const teleportationSpotsLayer = tiledMap.layers.find(
         ({ name }) => name === 'TeleportationSpots',
      );
      _assert(teleportationSpotsLayer, `TeleportationSpots layer not found in ${map}.json`);

      const roomName = `${map}Room` as Room;
      teleportationSpots[roomName] = [];

      teleportationSpotsLayer.objects.forEach(({ properties, x, y, width, height }) => {
         const destinationMapName = properties.find(({ name }) => name === 'destinationMapName');
         const entranceDirection = properties.find(({ name }) => name === 'entranceDirection');
         const entrancePositionX = properties.find(({ name }) => name === 'entrancePositionX');
         const entrancePositionY = properties.find(({ name }) => name === 'entrancePositionY');

         _assert(destinationMapName, `destinationMapName property not found in ${map}.json`);
         _assert(entranceDirection, `entranceDirection property not found in ${map}.json`);
         _assert(entrancePositionX, `entrancePositionX property not found in ${map}.json`);
         _assert(entrancePositionY, `entrancePositionY property not found in ${map}.json`);

         teleportationSpots[roomName].push({
            x: x / width,
            y: y / height,
            destinationMapName: destinationMapName.value as Room,
            destinationMapData: {
               entranceDirection: entranceDirection.value.toLocaleUpperCase() as Direction,
               entrancePosition: {
                  x: Number(entrancePositionX.value),
                  y: Number(entrancePositionY.value),
               },
            },
         });
      });
   }

   const teleportationSpotsPath = resolve(__dirname, '../../shared/src/data/teleportationSpots.ts');
   const teleportationSpotsBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import type { Room } from '../types/Room';
import { Direction } from '../types/SceneData';
import type { TeleportationSpot } from '../types/TeleportationSpot';

export const TELEPORTATION_SPOTS: Record<Room, TeleportationSpot[]> = ${JSON.stringify(
      teleportationSpots,
      null,
      3,
   )
      .replace(/"UP"/g, 'Direction.UP')
      .replace(/"DOWN"/g, 'Direction.DOWN')
      .replace(/"LEFT"/g, 'Direction.LEFT')
      .replace(/"RIGHT"/g, 'Direction.RIGHT')};
`;

   writeFileSync(teleportationSpotsPath, teleportationSpotsBlob, { flag: 'w' });
   console.log('[Shared] ✅  Regenerated teleportationSpots.ts');
};

generateMaps();
