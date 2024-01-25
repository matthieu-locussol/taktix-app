import { Client, Room } from 'colyseus.js';
import { makeAutoObservable } from 'mobx';
import { AuthRoomResponse, isAuthRoomResponse } from 'shared/src/rooms/AuthRoom';
import { ChatRoomResponse, isChatRoomResponse } from 'shared/src/rooms/ChatRoom';
import { MapRoomResponse, isMapRoomResponse } from 'shared/src/rooms/MapRoom';
import { MapState } from 'shared/src/states/MapState';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { Position, SceneData } from 'shared/src/types/SceneData';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { match } from 'ts-pattern';
import { Store } from './Store';

const WS_CLOSED_CONSENTED = 4000;

export class ColyseusStore {
   private _client: Client;

   private _authRoom: Room | null;

   private _chatRoom: Room | null;

   private _gameRoom: Room<MapState> | null;

   private _store: Store;

   private _uuid: string | null = null;

   public changingMap = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._client = new Client(import.meta.env.VITE_SERVER_WEBSOCKET_URL);
      this._authRoom = null;
      this._chatRoom = null;
      this._gameRoom = null;
      this._store = store;
      this._uuid = null;
   }

   setAuthRoom(authRoom: Room) {
      this._authRoom = authRoom;
      this.initializeAuthRoom();
   }

   setChatRoom(chatRoom: Room) {
      this._chatRoom = chatRoom;
      this.initializeChatRoom();
   }

   setGameRoom(gameRoom: Room<MapState>) {
      this._gameRoom = gameRoom;
      this.initializeGameRoom();
   }

   setUuid(uuid: string) {
      this._uuid = uuid;
   }

   setChangingMap(changingMap: boolean) {
      this.changingMap = changingMap;
   }

   private get authRoom() {
      _assert(this._authRoom, 'AuthRoom should be defined');
      _assertTrue(this._authRoom.name === 'AuthRoom', 'Room should be AuthRoom');

      return this._authRoom;
   }

   private get chatRoom() {
      _assert(this._chatRoom, 'ChatRoom should be defined');
      _assertTrue(this._chatRoom.name === 'ChatRoom', 'Room should be ChatRoom');

      return this._chatRoom;
   }

   private get gameRoom() {
      _assert(this._gameRoom, 'GameRoom should be defined');
      return this._gameRoom;
   }

   private get uuid() {
      _assert(this._uuid, 'uuid should be defined');
      return this._uuid;
   }

   login(username: string, password: string) {
      return this._client.joinOrCreate('AuthRoom', {
         username,
         password,
      });
   }

   async leaveAuthRoom() {
      await this.authRoom.leave();
      this._authRoom = null;
   }

   async leaveGameRoom() {
      await this.gameRoom.leave();
      this._gameRoom = null;
   }

   selectCharacter(characterName: string) {
      this.authRoom.send('selectCharacter', { characterName });
   }

   createCharacter(characterName: string) {
      this.authRoom.send('createCharacter', { characterName });
   }

   deleteCharacter(characterName: string, password: string) {
      this.authRoom.send('deleteCharacter', { characterName, password });
   }

   private async joinRoom(roomName: string, position?: Position) {
      if (this._authRoom !== null) {
         await this.leaveAuthRoom();
      } else if (this._gameRoom !== null) {
         await this.leaveGameRoom();
      }

      const room = await this._client.joinOrCreate<MapState>(roomName, {
         uuid: this.uuid,
         position,
      });

      this.setGameRoom(room);
   }

   private async joinChatRoom() {
      if (this._chatRoom !== null) {
         await this._chatRoom.leave();
      }

      const chatRoom = await this._client.joinOrCreate('ChatRoom', { uuid: this.uuid });
      this.setChatRoom(chatRoom);
   }

   private initializeAuthRoom() {
      this.authRoom.onLeave((code) => {
         this.onWebSocketClosed(code);
      });

      this.authRoom.onMessage('*', (type: unknown, message: unknown) => {
         const payload = { type, message };

         if (isAuthRoomResponse(payload)) {
            match(payload)
               .with({ type: 'selectCharacterResponse' }, ({ message: payloadMessage }) => {
                  this.onSelectCharacterResponse(payloadMessage);
               })
               .with({ type: 'createCharacterResponse' }, ({ message: payloadMessage }) => {
                  this.onCreateCharacterResponse(payloadMessage);
               })
               .with({ type: 'deleteCharacterResponse' }, ({ message: payloadMessage }) => {
                  this.onDeleteCharacterResponse(payloadMessage);
               })
               .exhaustive();
         }
      });
   }

   onSelectCharacterResponse(
      message: Extract<AuthRoomResponse, { type: 'selectCharacterResponse' }>['message'],
   ) {
      this._store.characterSelectionStore.reset();
      this._store.characterSelectionStore.setLoading(true);

      match(message)
         .with({ status: 'error' }, ({ errorMessage }) => {
            this._store.characterSelectionStore.setErrorMessage(errorMessage);
            this._store.characterSelectionStore.setLoading(false);
         })
         .with({ status: 'success' }, async ({ map, posX, posY, uuid }) => {
            this.setUuid(uuid);
            await Promise.all([this.joinRoom(map), this.joinChatRoom()]);

            this._store.characterSelectionStore.setLoading(false);
            this._store.screenStore.setLoggedIn(true);

            const scene = this._store.gameStore.changeMapPlayer(map, {
               entrancePosition: { x: posX, y: posY },
            });

            scene.gridEngine.setPosition(INTERNAL_PLAYER_NAME, { x: posX, y: posY }, 'player');

            this._store.characterStore.setName(
               this._store.characterSelectionStore.selectedCharacter,
            );
            this._store.characterStore.setMap(map);
            this._store.characterStore.setPosition({ x: posX, y: posY });
            this._store.characterStore.setPlayers([]);

            this._store.loadingScreenStore.setSceneVisible(true);
         })
         .exhaustive();
   }

   onCreateCharacterResponse(
      message: Extract<AuthRoomResponse, { type: 'createCharacterResponse' }>['message'],
   ) {
      this._store.characterCreationStore.reset();

      match(message)
         .with({ status: 'error' }, ({ errorMessage }) => {
            this._store.characterCreationStore.setErrorMessage(errorMessage);
         })
         .with({ status: 'success' }, async ({ characters }) => {
            this._store.characterCreationStore.reset();
            this._store.characterSelectionStore.setCharacters(characters);
            this._store.characterSelectionStore.setSuccessMessage('Character created!');

            this._store.screenStore.setScreen('characterSelection');
         })
         .exhaustive();
   }

   onDeleteCharacterResponse(
      message: Extract<AuthRoomResponse, { type: 'deleteCharacterResponse' }>['message'],
   ) {
      this._store.characterSelectionStore.reset();

      match(message)
         .with({ status: 'error' }, ({ errorMessage }) => {
            this._store.characterSelectionStore.setErrorMessage(errorMessage);
         })
         .with({ status: 'success' }, ({ characters }) => {
            this._store.characterSelectionStore.setCharacters(characters);
            this._store.characterSelectionStore.setSuccessMessage('Character deleted');
         })
         .exhaustive();
   }

   private initializeChatRoom() {
      this.chatRoom.onMessage('*', (type: unknown, message: unknown) => {
         const payload = { type, message };

         if (isChatRoomResponse(payload)) {
            match(payload)
               .with({ type: 'message' }, ({ message: payloadMessage }) => {
                  this.onMessage(payloadMessage);
               })
               .exhaustive();
         }
      });
   }

   onMessage(message: Extract<ChatRoomResponse, { type: 'message' }>['message']) {
      this._store.chatStore.addMessage(message);
   }

   sendMessage(channel: number, content: string) {
      this.chatRoom.send('message', { channel, content });
   }

   private initializeGameRoom() {
      this.gameRoom.onLeave((code) => {
         this.onWebSocketClosed(code);
      });

      this.gameRoom.onMessage('*', (type: unknown, message: unknown) => {
         const payload = { type, message };

         if (isMapRoomResponse(payload)) {
            match(payload)
               .with({ type: 'changeMap' }, ({ message: payloadMessage }) => {
                  const { gridEngine, sys } = this._store.gameStore.getCurrentScene;

                  if (!gridEngine.isMoving(INTERNAL_PLAYER_NAME)) {
                     this.onChangeMap(payloadMessage);
                  } else {
                     const subscription = gridEngine.movementStopped().subscribe((entity) => {
                        if (sys.isVisible() && entity.charId === INTERNAL_PLAYER_NAME) {
                           this.onChangeMap(payloadMessage);
                           subscription.unsubscribe();
                        }
                     });
                  }
               })
               .exhaustive();
         }
      });

      this.gameRoom.state.players.onAdd((player) => {
         const { name, x, y } = player;
         const isPlayer = name === this._store.characterStore.name;

         if (!isPlayer) {
            this._store.gameStore.getCurrentScene.addExternalPlayer(name, { x, y });

            player.listen('x', (newX) => {
               this._store.gameStore.getCurrentScene.setNextX(name, newX);
            });

            player.listen('y', (newY) => {
               this._store.gameStore.getCurrentScene.setNextY(name, newY);
            });
         }
      });

      this.gameRoom.state.players.onRemove((player) => {
         const { name } = player;
         const isPlayer = name === this._store.characterStore.name;

         if (!isPlayer) {
            this._store.gameStore.getCurrentScene.deleteExternalPlayer(name);
         }
      });
   }

   movePlayer(x: number, y: number) {
      this.gameRoom.send('move', { x, y });
   }

   async onChangeMap({ map, x, y }: Extract<MapRoomResponse, { type: 'changeMap' }>['message']) {
      this._store.gameStore.enableKeyboard(false);

      const scene = this._store.gameStore.getCurrentScene;
      scene.fadeOut((_, progress) => {
         if (progress === 1) {
            this.setChangingMap(true);

            const sceneData: SceneData = {
               entrancePosition: { x, y },
            };
            scene.scene.start(map, sceneData);
         }
      });

      await this.joinRoom(map, { x, y });

      this.setChangingMap(false);
      this._store.gameStore.enableKeyboard(true);
   }

   private async onWebSocketClosed(code: number) {
      if (code !== WS_CLOSED_CONSENTED) {
         this._store.screenStore.setLoggedIn(false);
         this._store.screenStore.setScreen('login');
         this._store.loginStore.setErrorMessage(
            `[${code}] You have been disconnected from the server`,
         );

         this._client = new Client(import.meta.env.VITE_SERVER_WEBSOCKET_URL);
      }
   }
}
