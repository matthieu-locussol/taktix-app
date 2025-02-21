import type { NPC } from 'shared/src/data/npcs';
import type { MapFightData } from 'shared/src/types/MapFight';
import type { NPCSpot } from 'shared/src/types/NPCSpot';
import type { Room } from 'shared/src/types/Room';
import type { TeleportationPlace } from 'shared/src/types/TeleportationPlace';
import type { TeleportationSpot } from 'shared/src/types/TeleportationSpot';

import assert from 'assert';
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import {
   interactiveObjectsKeys,
   type InteractiveObject,
   type InteractiveObjectData,
} from 'shared/dist/types/InteractiveObject';
import { isMonsterName } from 'shared/src/data/monsters';
import { zDirection, type Direction } from 'shared/src/types/SceneData';
import { _assertTrue } from 'shared/src/utils/_assert';

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
      properties: {
         name: string;
         type: string;
         value: string;
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
   regenerateInteractiveObjects(maps);
   regenerateFights(maps);
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
      const mapRoomBlob = `// This file has been automatically generated. DO NOT edit it manually.\n      
import { MapRoom } from '../MapRoom';

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
   const defineMapsRoomsBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import type { Server } from '@colyseus/core';

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
      const mapSceneBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import { Scene } from '../Scene';

export class ${map}Scene extends Scene {
   constructor() {
      super('${map}Room');
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('${map}_music', { loop: true, volume: 0.25 });
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
${maps.map((map) => `import { ${map}Scene } from './scenes/${map}Scene';`).join('\n')}
import { AAA_InitialScene } from './scenes/special/AAA_InitialScene';

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
import type { TeleportationSpot } from '../types/TeleportationSpot';

import { Direction } from '../types/SceneData';

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
            npcName: id.value as NPC,
            mapName: roomName,
            direction: zDirection.parse(direction.value),
         });
      });
   }

   const npcSpotsPath = resolve(__dirname, '../../shared/src/data/npcSpots.ts');
   const npcSpotsBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import type { NPCSpot } from '../types/NPCSpot';
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
            const price = properties.find(({ name }) => name === 'price');

            assert(price !== undefined, `price property not found in ${map}.json`);

            teleportationPlaces[roomName] = {
               x: x / width,
               y: y / height,
               direction: zDirection.parse(direction.value),
               price: Number(price.value),
            };
         });
   }

   const teleportationPlacesPath = resolve(
      __dirname,
      '../../shared/src/data/teleportationPlaces.ts',
   );
   const teleportationPlacesBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import type { Room } from '../types/Room';
import type { TeleportationPlace } from '../types/TeleportationPlace';

import { Direction } from '../types/SceneData';

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

const regenerateInteractiveObjects = (maps: string[]) => {
   const interactiveObjects: Record<Room, InteractiveObjectData[]> = {} as Record<
      Room,
      InteractiveObjectData[]
   >;
   const interactiveObjectsMap: Record<Room, Record<InteractiveObject, boolean>> = {} as Record<
      Room,
      Record<InteractiveObject, boolean>
   >;

   interactiveObjects.AAA_InitialRoom = [];
   interactiveObjectsMap.AAA_InitialRoom = interactiveObjectsKeys.reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<InteractiveObject, boolean>,
   );

   for (const map of maps) {
      const tiledMapPath = resolve(
         __dirname,
         `../../../apps/client/public/assets/maps/${map}.json`,
      );
      const tiledMapBlob = readFileSync(tiledMapPath, { encoding: 'utf-8' });
      const tiledMap: TiledMapJson = JSON.parse(tiledMapBlob);
      const roomName = `${map}Room` as Room;

      interactiveObjects[roomName] = [];
      interactiveObjectsMap[roomName] = {
         ...interactiveObjectsMap.AAA_InitialRoom,
      };

      const interactiveLayer = tiledMap.layers.find(({ name }) => name === 'Interactive');

      if (interactiveLayer === undefined) {
         continue;
      }

      interactiveLayer.objects.forEach(({ x, y, width, height, properties }) => {
         const id = properties.find(({ name }) => name === 'id');

         assert(id !== undefined, `id property not found in ${map}.json`);

         interactiveObjects[roomName].push({
            id: id.value as InteractiveObject,
            x: x / width,
            y: y / height,
         });
         interactiveObjectsMap[roomName][id.value as InteractiveObject] = true;
      });
   }

   const interactiveObjectsPath = resolve(__dirname, '../../shared/src/data/interactiveObjects.ts');
   const interactiveObjectsBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import type { InteractiveObject, InteractiveObjectData } from '../types/InteractiveObject';
import type { Room } from '../types/Room';

export const INTERACTIVE_OBJECTS: Record<Room, InteractiveObjectData[]> = ${JSON.stringify(
      interactiveObjects,
      null,
      3,
   )};

export const INTERACTIVE_OBJECTS_MAP: Record<Room, Record<InteractiveObject, boolean>> = ${JSON.stringify(
      interactiveObjectsMap,
      null,
      3,
   )};
`;

   writeFileSync(interactiveObjectsPath, interactiveObjectsBlob, { flag: 'w' });
   console.log('[Shared] ✅  Regenerated interactiveObjects.ts');
};

const regenerateFights = (maps: string[]) => {
   const mapsFights: Record<Room, MapFightData | null> = {} as Record<Room, MapFightData | null>;

   mapsFights.AAA_InitialRoom = null;

   for (const map of maps) {
      const tiledMapPath = resolve(
         __dirname,
         `../../../apps/client/public/assets/maps/${map}.json`,
      );
      const tiledMapBlob = readFileSync(tiledMapPath, { encoding: 'utf-8' });
      const tiledMap: TiledMapJson = JSON.parse(tiledMapBlob);

      const roomName = `${map}Room` as Room;

      mapsFights[roomName] = null;

      const fightsLayer = tiledMap.layers.find(({ name }) => name === 'Fights');

      if (fightsLayer !== undefined) {
         const fights: MapFightData['fights'] = [];

         fightsLayer.objects.forEach(({ properties, x, y, width, height }) => {
            const fightIds = properties.find(({ name }) => name === 'fightIds');
            const name = properties.find(({ name }) => name === 'name');
            const radius = properties.find(({ name }) => name === 'radius');

            assert(fightIds !== undefined, `fightIds property not found in ${map}.json`);
            assert(name !== undefined, `name property not found in ${map}.json`);
            assert(radius !== undefined, `radius property not found in ${map}.json`);

            if (!isMonsterName(name.value)) {
               throw new Error(`Unknown monster name: '${name.value}'`);
            }

            fights.push({
               fightsIds: fightIds.value.split(',').map(Number),
               positionX: x / width,
               positionY: y / height,
               name: name.value,
               radius: Number(radius.value),
            });
         });

         if (fights.length > 0) {
            const timeoutRegenerationInMns = fightsLayer.properties.find(
               ({ name }) => name === 'timeoutRegenerationInMns',
            );

            assert(
               timeoutRegenerationInMns !== undefined,
               `timeoutRegenerationInMns property not found in ${map}.json`,
            );

            mapsFights[roomName] = {
               fights,
               timeoutRegeneration: 1_000 * 60 * Number(timeoutRegenerationInMns.value),
            };
         }
      }
   }

   const mapsFightsPath = resolve(__dirname, '../../shared/src/data/mapsFights.ts');
   const mapsFightsBlob = `// This file has been automatically generated. DO NOT edit it manually.\n
import type { MapFightData } from '../types/MapFight';
import type { Room } from '../types/Room';

export const mapsFights: Record<Room, MapFightData | null> = ${JSON.stringify(mapsFights, null, 3)};
`;

   writeFileSync(mapsFightsPath, mapsFightsBlob, { flag: 'w' });
   console.log('[Shared] ✅  Regenerated mapsFights.ts');
};

generateMaps();
