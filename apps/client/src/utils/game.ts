import type { Position } from 'grid-engine';
import { ClientPacket } from 'shared';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { game } from '../game/PhaserGame';
import type { Scene, SceneData } from '../game/Scene';
import { store } from '../store';

export const getCurrentScene = (): Scene => {
   const { scenes } = game.scene;
   const activeScenes = scenes.filter(({ scene }) => game.scene.isActive(scene.key));
   _assertTrue(activeScenes.length <= 1, 'There should be only one active scene at a time.');
   return activeScenes[0] as Scene;
};

export const getCurrentSceneByKey = (key: string): Scene => {
   const { scenes } = game.scene;
   const activeScenes = scenes.filter(({ scene }) => scene.key === key);
   _assertTrue(activeScenes.length === 1);
   return activeScenes[0] as Scene;
};

export const teleportPlayer = (position: Position) => {
   const scene = getCurrentScene();
   scene.gridEngine.setPosition('player', position, 'player');

   const { characterStore } = store;
   characterStore.setPosition(position);
};

export const changeMapPlayer = (map: string, data: SceneData) => {
   const scene = getCurrentScene();
   const returnedScene = scene.scene.start(map, data).scene;

   const { characterStore } = store;
   _assert(data.entrancePosition);
   characterStore.setPosition(data.entrancePosition);
   characterStore.setPlayers([]);

   const packet: ClientPacket = {
      type: 'changeMap',
      map,
      x: data.entrancePosition.x,
      y: data.entrancePosition.y,
   };

   if (store.socketStore.socket !== null) {
      store.socketStore.socket.send(JSON.stringify(packet));
   }

   return returnedScene as Scene;
};
