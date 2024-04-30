import assert = require('assert');
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import {
   type Direction,
   type NPCSpot,
   type Room,
   TeleportationPlace,
   type TeleportationSpot,
   _assertTrue,
   zDirection,
   zNPC,
} from 'shared';

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
   regenerateNpcSpots(maps);
   regenerateTeleportationPlaces(maps);
};

const regenerateSharedRoom = (maps: string[]) => {
   const roomDefinitionPath = resolve(__dirname, '../../shared/src/types/Room.ts');
   const roomDefinitionBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

const rooms = [
   'AAA_InitialRoom',
   ${maps.map((map) => `'${map}Room'`).join(',\n   ')},
] as const;

export const zRoom = ZodMgt.constructZodLiteralUnionType(rooms.map((room) => z.literal(room)));

export const isRoom = (value: unknown): value is Room => zRoom.safeParse(value).success;

export type Room = z.infer<typeof zRoom>;
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
      ${tiledMapTilesets
         .map((tileset) => `this.load.image('${tileset.name}_tileset', '${tileset.image}');`)
         .join('\n      ')}
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
      ${tiledMapTilesets
         .map(
            (tileset) =>
               `this.tilemap.addTilesetImage('${tileset.name}', '${tileset.name}_tileset');`,
         )
         .join('\n      ')}
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
      assert(
         teleportationSpotsLayer !== undefined,
         `TeleportationSpots layer not found in ${map}.json`,
      );

      const roomName = `${map}Room` as Room;
      teleportationSpots[roomName] = [];

      teleportationSpotsLayer.objects.forEach(({ properties, x, y, width, height }) => {
         const destinationMapName = properties.find(({ name }) => name === 'destinationMapName');
         const entranceDirection = properties.find(({ name }) => name === 'entranceDirection');
         const entrancePositionX = properties.find(({ name }) => name === 'entrancePositionX');
         const entrancePositionY = properties.find(({ name }) => name === 'entrancePositionY');

         assert(
            destinationMapName !== undefined,
            `destinationMapName property not found in ${map}.json`,
         );
         assert(
            entranceDirection !== undefined,
            `entranceDirection property not found in ${map}.json`,
         );
         assert(
            entrancePositionX !== undefined,
            `entrancePositionX property not found in ${map}.json`,
         );
         assert(
            entrancePositionY !== undefined,
            `entrancePositionY property not found in ${map}.json`,
         );

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
      .replace(/"UP"/gi, 'Direction.UP')
      .replace(/"DOWN"/gi, 'Direction.DOWN')
      .replace(/"LEFT"/gi, 'Direction.LEFT')
      .replace(/"RIGHT"/gi, 'Direction.RIGHT')};
`;

   writeFileSync(teleportationSpotsPath, teleportationSpotsBlob, { flag: 'w' });
   console.log('[Shared] ✅  Regenerated teleportationSpots.ts');
};

const regenerateNpcSpots = (maps: string[]) => {
   const npcSpots: Record<Room, NPCSpot[]> = {} as Record<Room, NPCSpot[]>;

   npcSpots.AAA_InitialRoom = [];

   for (const map of maps) {
      const tiledMapPath = resolve(
         __dirname,
         `../../../apps/client/public/assets/maps/${map}.json`,
      );
      const tiledMapBlob = readFileSync(tiledMapPath, { encoding: 'utf-8' });
      const tiledMap: TiledMapJson = JSON.parse(tiledMapBlob);

      const npcSpotsLayer = tiledMap.layers.find(({ name }) => name === 'Npcs');
      assert(npcSpotsLayer !== undefined, `Npcs layer not found in ${map}.json`);

      const roomName = `${map}Room` as Room;
      npcSpots[roomName] = [];

      npcSpotsLayer.objects.forEach(({ properties, x, y, width, height }) => {
         const id = properties.find(({ name }) => name === 'id');
         const direction = properties.find(({ name }) => name === 'direction');

         assert(id !== undefined, `id property not found in ${map}.json`);
         assert(direction !== undefined, `direction property not found in ${map}.json`);

         npcSpots[roomName].push({
            x: x / width,
            y: y / height,
            npcName: zNPC.parse(id.value),
            mapName: roomName,
            direction: zDirection.parse(direction.value),
         });
      });
   }

   const npcSpotsPath = resolve(__dirname, '../../shared/src/data/npcSpots.ts');
   const npcSpotsBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import { NPCSpot } from '../types/NPCSpot';
import type { Room } from '../types/Room';
import { Direction } from '../types/SceneData';

export const NPC_SPOTS: Record<Room, NPCSpot[]> = ${JSON.stringify(npcSpots, null, 3)
      .replace(/"UP"/gi, 'Direction.UP')
      .replace(/"DOWN"/gi, 'Direction.DOWN')
      .replace(/"LEFT"/gi, 'Direction.LEFT')
      .replace(/"RIGHT"/gi, 'Direction.RIGHT')};
`;

   writeFileSync(npcSpotsPath, npcSpotsBlob, { flag: 'w' });
   console.log('[Shared] ✅  Regenerated npcSpots.ts');
};

const regenerateTeleportationPlaces = (maps: string[]) => {
   const teleportationPlaces: Record<Room, TeleportationPlace | null> = {} as Record<
      Room,
      TeleportationPlace | null
   >;

   teleportationPlaces.AAA_InitialRoom = null;

   for (const map of maps) {
      const tiledMapPath = resolve(
         __dirname,
         `../../../apps/client/public/assets/maps/${map}.json`,
      );
      const tiledMapBlob = readFileSync(tiledMapPath, { encoding: 'utf-8' });
      const tiledMap: TiledMapJson = JSON.parse(tiledMapBlob);

      const roomName = `${map}Room` as Room;
      teleportationPlaces[roomName] = null;

      const interactiveLayer = tiledMap.layers.find(({ name }) => name === 'Interactive');
      if (interactiveLayer === undefined) {
         continue;
      }

      interactiveLayer.objects
         .filter(({ properties }) => {
            const id = properties.find(({ name }) => name === 'id');
            assert(id !== undefined, `id property not found in ${map}.json`);
            return id.value === 'Teleporter';
         })
         .forEach(() => {
            _assertTrue(
               teleportationPlaces[roomName] === null,
               'Only one teleporter is allowed per room',
            );

            const teleporterCell = interactiveLayer.objects.find(({ properties }) => {
               const id = properties.find(({ name }) => name === 'id');
               assert(id !== undefined, `id property not found in ${map}.json`);
               return id.value === 'TeleporterCell';
            });

            assert(teleporterCell !== undefined, `TeleporterCell not found in ${map}.json`);
            const { x, y, width, height, properties } = teleporterCell;

            const direction = properties.find(({ name }) => name === 'direction');
            assert(direction !== undefined, `direction property not found in ${map}.json`);

            teleportationPlaces[roomName] = {
               x: x / width,
               y: y / height,
               direction: zDirection.parse(direction.value),
            };
         });
   }

   const teleportationPlacesPath = resolve(
      __dirname,
      '../../shared/src/data/teleportationPlaces.ts',
   );
   const teleportationPlacesBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import type { Room } from '../types/Room';
import { Direction } from '../types/SceneData';
import type { TeleportationPlace } from '../types/TeleportationPlace';

export const TELEPORTATION_PLACES: Record<Room, TeleportationPlace | null> = ${JSON.stringify(
      teleportationPlaces,
      null,
      3,
   )
      .replace(/"UP"/gi, 'Direction.UP')
      .replace(/"DOWN"/gi, 'Direction.DOWN')
      .replace(/"LEFT"/gi, 'Direction.LEFT')
      .replace(/"RIGHT"/gi, 'Direction.RIGHT')};
`;

   writeFileSync(teleportationPlacesPath, teleportationPlacesBlob, { flag: 'w' });
   console.log('[Shared] ✅  Regenerated teleportationPlaces.ts');
};

generateMaps();
