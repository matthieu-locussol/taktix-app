import type { Position } from 'grid-engine';
import type { FightState } from 'shared/src/states/FightState';
import type { PlayerState } from 'shared/src/states/PlayerState';
import type { SceneData } from 'shared/src/types/SceneData';
import type { Scene } from '../game/Scene';
import type { Store } from './Store';

import { makeAutoObservable } from 'mobx';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { NumberMgt } from 'shared/src/utils/numberMgt';
import { TimeMgt } from 'shared/src/utils/timeMgt';

import { PLAYER_GE_LAYER, ZOOM_MAX, ZOOM_MIN } from '../game/Scene';

const CHECK_INTERVAL = 10;
const MAX_CHECK_ATTEMPTS = 1_000;

export class GameStore {
   private _game: Phaser.Game | null;

   private _store: Store;

   public fightsToAddQueue: FightState[] = [];

   public fightsToRemoveQueue: FightState[] = [];

   public playersToAddQueue: PlayerState[] = [];

   public playersToRemoveQueue: PlayerState[] = [];

   public zoom: number = ZOOM_MIN;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._game = null;
      this._store = store;
   }

   initialize(game: Phaser.Game) {
      this._game = game;
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

   get game() {
      _assert(this._game);

      return this._game;
   }

   get currentScene() {
      const { scenes } = this.game.scene;
      const activeScenes = scenes.filter(({ scene }) => this.game.scene.isActive(scene.key));

      _assertTrue(activeScenes.length <= 1, 'There should be only one active scene at a time.');

      return activeScenes[0] as Scene;
   }

   async getCurrentScene() {
      let attempts = 0;

      while (attempts < MAX_CHECK_ATTEMPTS) {
         attempts += 1;

         const { currentScene } = this;

         if (currentScene !== undefined) {
            return currentScene;
         }

         await TimeMgt.wait(CHECK_INTERVAL);
      }

      throw new Error('Could not find the current scene.');
   }

   async teleportPlayer(position: Position) {
      const scene = await this.getCurrentScene();

      scene.gridEngine.setPosition(INTERNAL_PLAYER_NAME, position, PLAYER_GE_LAYER);

      const { characterStore } = this._store;

      characterStore.setPosition(position);
   }

   async changeMapPlayer(map: string, data: SceneData) {
      const scene = await this.getCurrentScene();
      const returnedScene = scene.scene.start(map, data).scene;

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
