import { Position } from 'grid-engine';
import { makeAutoObservable } from 'mobx';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { SceneData } from 'shared/src/types/SceneData';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { Scene } from '../game/Scene';
import { Store } from './Store';

export class GameStore {
   private _game: Phaser.Game | null;

   private _store: Store;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._game = null;
      this._store = store;
   }

   initialize(game: Phaser.Game) {
      this._game = game;
   }

   get game() {
      _assert(this._game);
      return this._game;
   }

   get getCurrentScene(): Scene {
      const { scenes } = this.game.scene;
      const activeScenes = scenes.filter(({ scene }) => this.game.scene.isActive(scene.key));
      _assertTrue(activeScenes.length <= 1, 'There should be only one active scene at a time.');
      return activeScenes[0] as Scene;
   }

   teleportPlayer(position: Position) {
      const scene = this.getCurrentScene;
      scene.gridEngine.setPosition(INTERNAL_PLAYER_NAME, position, 'player');

      const { characterStore } = this._store;
      characterStore.setPosition(position);
   }

   changeMapPlayer(map: string, data: SceneData) {
      const scene = this.getCurrentScene;
      const returnedScene = scene.scene.start(map, data).scene;

      const { characterStore } = this._store;
      _assert(data.entrancePosition);
      characterStore.setPosition(data.entrancePosition);
      characterStore.setPlayers([]);

      this._store.socketStore.send({
         type: 'changeMap',
         map,
         x: data.entrancePosition.x,
         y: data.entrancePosition.y,
      });

      return returnedScene as Scene;
   }

   enableKeyboard(enable: boolean) {
      this.game.input.keyboard.enabled = enable;
   }
}
