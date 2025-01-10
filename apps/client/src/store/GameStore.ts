import type { Position } from 'grid-engine';
import type { FightState } from 'shared/src/states/FightState';
import type { PlayerState } from 'shared/src/states/PlayerState';
import type { SceneData } from 'shared/src/types/SceneData';
import type { Scene } from '../game/Scene';
import type { Store } from './Store';

import { makeAutoObservable } from 'mobx';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { _assert } from 'shared/src/utils/_assert';
import { NumberMgt } from 'shared/src/utils/numberMgt';

import { PLAYER_GE_LAYER, ZOOM_MAX, ZOOM_MIN } from '../game/Scene';

export class GameStore {
   private _currentScene: Scene | null;

   private _game: Phaser.Game | null;

   private _store: Store;

   public fightsToAddQueue: FightState[] = [];

   public fightsToRemoveQueue: FightState[] = [];

   public playersToAddQueue: PlayerState[] = [];

   public playersToRemoveQueue: PlayerState[] = [];

   public zoom: number = ZOOM_MIN;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._currentScene = null;
      this._game = null;
      this._store = store;
   }

   initialize(game: Phaser.Game) {
      this._game = game;
   }

   setCurrentScene(scene: Scene) {
      this._currentScene = scene;
   }

   addFightToQueue(fight: FightState) {
      this.fightsToAddQueue.push(fight);
   }

   removeFightFromQueue(fight: FightState) {
      this.fightsToAddQueue = this.fightsToAddQueue.filter(({ id }) => id !== fight.id);
      this.fightsToRemoveQueue.push(fight);
   }

   addPlayerToQueue(player: PlayerState) {
      const isPlayer = player.name === this._store.characterStore.name;

      if (!isPlayer) {
         this.playersToAddQueue.push(player);
      }
   }

   removePlayerFromQueue(player: PlayerState) {
      const isPlayer = player.name === this._store.characterStore.name;

      if (!isPlayer) {
         this.playersToAddQueue = this.playersToAddQueue.filter(({ name }) => name !== player.name);
         this.playersToRemoveQueue.push(player);
      }
   }

   get shouldProcessFightQueue() {
      return this.fightsToAddQueue.length > 0 || this.fightsToRemoveQueue.length > 0;
   }

   get shouldProcessPlayerQueue() {
      return this.playersToAddQueue.length > 0 || this.playersToRemoveQueue.length > 0;
   }

   get currentScene() {
      _assert(this._currentScene);

      return this._currentScene;
   }

   get game() {
      _assert(this._game);

      return this._game;
   }

   async teleportPlayer(position: Position) {
      this.currentScene.gridEngine.setPosition(INTERNAL_PLAYER_NAME, position, PLAYER_GE_LAYER);

      const { characterStore } = this._store;

      characterStore.setPosition(position);
   }

   async changeMapPlayer(map: string, data: SceneData) {
      const returnedScene = this.currentScene.scene.start(map, data).scene;

      const { characterStore } = this._store;

      _assert(data.entrancePosition);
      characterStore.setPosition(data.entrancePosition);

      return returnedScene as Scene;
   }

   enableKeyboard(enable: boolean) {
      if (this.game.input.keyboard !== null) {
         this.game.input.keyboard.enabled = enable;
      }
   }

   setZoom(zoom: number) {
      this.zoom = NumberMgt.clamp(zoom, ZOOM_MIN, ZOOM_MAX);
   }
}
