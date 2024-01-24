'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = require('fs');
var path_1 = require('path');
// TODO: handle teleportation spots
var generateMaps = function () {
   var mapsFolderPath = (0, path_1.resolve)(__dirname, '../../../apps/client/public/assets/maps');
   var mapsFolder = (0, fs_1.readdirSync)(mapsFolderPath);
   var maps = mapsFolder
      .filter(function (file) {
         return file.endsWith('.json');
      })
      .map(function (file) {
         return file.replace('.json', '');
      });
   regenerateSharedRoom(maps);
   generateServerMapsRooms(maps);
   generateClientMapsScenes(maps);
};
var regenerateSharedRoom = function (maps) {
   var roomDefinitionPath = (0, path_1.resolve)(__dirname, '../../shared/src/types/Room.ts');
   var roomDefinitionBlob =
      '// This file has been automatically generated. DO NOT edit it manually.\n\nexport type Room = '.concat(
         maps
            .map(function (map) {
               return "'".concat(map, "Room'");
            })
            .join(' | '),
         ';\n',
      );
   (0, fs_1.writeFileSync)(roomDefinitionPath, roomDefinitionBlob, { flag: 'w' });
   console.log('[Shared] ✅  Regenerated Room.ts');
};
var generateServerMapsRooms = function (maps) {
   for (var _i = 0, maps_1 = maps; _i < maps_1.length; _i++) {
      var map = maps_1[_i];
      var mapRoomPath = (0, path_1.resolve)(
         __dirname,
         '../../../apps/server/src/rooms/maps/'.concat(map, 'Room.ts'),
      );
      var mapRoomBlob = "import { MapRoom } from '../MapRoom';\n\nexport class "
         .concat(map, "Room extends MapRoom {\n   constructor() {\n      super('")
         .concat(map, "Room');\n   }\n}\n");
      if (!(0, fs_1.existsSync)(mapRoomPath)) {
         (0, fs_1.writeFileSync)(mapRoomPath, mapRoomBlob, { flag: 'w' });
         console.log('[Server] \u2728  Generated '.concat(map, 'Room.ts'));
      }
   }
   var mapsRoomsFolderPath = (0, path_1.resolve)(__dirname, '../../../apps/server/src/rooms/maps');
   var mapsRoomsFolder = (0, fs_1.readdirSync)(mapsRoomsFolderPath);
   var mapsRooms = mapsRoomsFolder;
   for (var _a = 0, mapsRooms_1 = mapsRooms; _a < mapsRooms_1.length; _a++) {
      var mapRoom = mapsRooms_1[_a];
      var mapName = mapRoom.replace('Room.ts', '');
      if (!maps.includes(mapName)) {
         var mapRoomPath = (0, path_1.resolve)(
            __dirname,
            '../../../apps/server/src/rooms/maps/'.concat(mapRoom),
         );
         (0, fs_1.unlinkSync)(mapRoomPath);
         console.log('[Server] \uD83E\uDDF9  Deleted '.concat(mapRoom));
      }
   }
   var defineMapsRoomsPath = (0, path_1.resolve)(
      __dirname,
      '../../../apps/server/src/rooms/utils/defineMapsRooms.ts',
   );
   var defineMapsRoomsBlob = "import { Server } from '@colyseus/core';\n"
      .concat(
         maps
            .map(function (map) {
               return 'import { '.concat(map, "Room } from '../maps/").concat(map, "Room';");
            })
            .join('\n'),
         '\n\nexport const defineMapsRooms = (gameServer: Server) => {\n   ',
      )
      .concat(
         maps
            .map(function (map) {
               return "gameServer.define('".concat(map, "Room', ").concat(map, 'Room);');
            })
            .join('\n   '),
         '\n};\n',
      );
   (0, fs_1.writeFileSync)(defineMapsRoomsPath, defineMapsRoomsBlob, { flag: 'w' });
   console.log('[Server] ✅  Regenerated defineMapsRooms.ts');
};
var generateClientMapsScenes = function (maps) {
   for (var _i = 0, maps_2 = maps; _i < maps_2.length; _i++) {
      var map = maps_2[_i];
      var tiledMapPath = (0, path_1.resolve)(
         __dirname,
         '../../../apps/client/public/assets/maps/'.concat(map, '.json'),
      );
      var tiledMapBlob = (0, fs_1.readFileSync)(tiledMapPath, { encoding: 'utf-8' });
      var tiledMap = JSON.parse(tiledMapBlob);
      var tiledMapTilesets = tiledMap.tilesets
         .filter(function (_a) {
            var name = _a.name;
            return name !== 'Collisions';
         })
         .map(function (_a) {
            var name = _a.name,
               image = _a.image;
            return {
               name: name,
               image: image.replace('../', '/assets/'),
            };
         });
      var mapScenePath = (0, path_1.resolve)(
         __dirname,
         '../../../apps/client/src/game/scenes/'.concat(map, 'Scene.ts'),
      );
      var mapSceneBlob = "import { Scene } from '../Scene';\n\nexport class "
         .concat(map, "Scene extends Scene {\n   constructor() {\n      super('")
         .concat(map, "Room');\n   }\n\n   public loadAssets(): void {\n      this.load.audio('")
         .concat(map, "_music', '/assets/musics/")
         .concat(map, ".mp3');\n      ")
         .concat(
            tiledMapTilesets
               .map(function (tileset) {
                  return "this.load.image('"
                     .concat(tileset.name, "_tileset', '")
                     .concat(tileset.image, "');");
               })
               .join('\n      '),
            "\n      this.load.tilemapTiledJSON('",
         )
         .concat(map, "_tiledmap', '/assets/maps/")
         .concat(
            map,
            ".json');\n      this.load.spritesheet('player', '/assets/characters/characters.png', {\n         frameWidth: 26,\n         frameHeight: 36,\n      });\n   }\n\n   public createTilemap(): Phaser.Tilemaps.Tilemap {\n      this.sound.stopAll();\n      this.sound.play('",
         )
         .concat(
            map,
            "_music', { loop: true, volume: 0.05 });\n      this.sound.pauseOnBlur = false;\n\n      this.tilemap = this.make.tilemap({ key: '",
         )
         .concat(map, "_tiledmap' });\n      ")
         .concat(
            tiledMapTilesets
               .map(function (tileset) {
                  return "this.tilemap.addTilesetImage('"
                     .concat(tileset.name, "', '")
                     .concat(tileset.name, "_tileset');");
               })
               .join('\n      '),
            '\n      this.initializeTilemap([',
         )
         .concat(
            tiledMapTilesets
               .map(function (tileset) {
                  return "'".concat(tileset.name, "'");
               })
               .join(', '),
            ']);\n\n      return this.tilemap;\n   }\n}\n',
         );
      if (!(0, fs_1.existsSync)(mapScenePath)) {
         (0, fs_1.writeFileSync)(mapScenePath, mapSceneBlob, { flag: 'w' });
         console.log('[Client] \u2728  Generated '.concat(map, 'Scene.ts'));
      }
   }
   var mapsScenesFilePath = (0, path_1.resolve)(
      __dirname,
      '../../../apps/client/src/game/mapsScenes.ts',
   );
   var mapsScenesBlob =
      '// This file has been automatically generated. DO NOT edit it manually.\n\n'
         .concat(
            maps
               .map(function (map) {
                  return 'import { '.concat(map, "Scene } from './scenes/").concat(map, "Scene';");
               })
               .join('\n'),
            '\n\nexport const mapsScenes: Phaser.Types.Scenes.SceneType[] = [',
         )
         .concat(
            maps
               .map(function (map) {
                  return ''.concat(map, 'Scene');
               })
               .join(', '),
            '];\n',
         );
   (0, fs_1.writeFileSync)(mapsScenesFilePath, mapsScenesBlob, { flag: 'w' });
   console.log('[Client] ✅  Regenerated mapsScenes.ts');
};
generateMaps();
