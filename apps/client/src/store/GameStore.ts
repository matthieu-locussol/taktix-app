import { Position } from 'grid-engine';
import { makeAutoObservable } from 'mobx';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { game } from '../game/PhaserGame';
import { Scene, SceneData } from '../game/Scene';
import { Store } from './Store';

export class GameStore {
   store: Store;

   constructor(store: Store) {
      makeAutoObservable(this);

      this.store = store;
   }

   get getCurrentScene(): Scene {
      const { scenes } = game.scene;
      const activeScenes = scenes.filter(({ scene }) => game.scene.isActive(scene.key));
      _assertTrue(activeScenes.length <= 1, 'There should be only one active scene at a time.');
      return activeScenes[0] as Scene;
   }

   getCurrentSceneByKey(key: string): Scene {
      const { scenes } = game.scene;
      const activeScenes = scenes.filter(({ scene }) => scene.key === key);
      _assertTrue(activeScenes.length === 1);
      return activeScenes[0] as Scene;
   }

   teleportPlayer(position: Position) {
      const scene = this.getCurrentScene;
      scene.gridEngine.setPosition('player', position, 'player');

      const { characterStore } = this.store;
      characterStore.setPosition(position);
   }

   changeMapPlayer(map: string, data: SceneData) {
      const scene = this.getCurrentScene;
      const returnedScene = scene.scene.start(map, data).scene;

      const { characterStore } = this.store;
      _assert(data.entrancePosition);
      characterStore.setPosition(data.entrancePosition);
      characterStore.setPlayers([]);

      this.store.socketStore.send({
         type: 'changeMap',
         map,
         x: data.entrancePosition.x,
         y: data.entrancePosition.y,
      });

      return returnedScene as Scene;
   }
}
