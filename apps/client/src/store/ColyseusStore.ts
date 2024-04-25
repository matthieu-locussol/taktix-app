import { Client, Room } from 'colyseus.js';
import { makeAutoObservable } from 'mobx';
import { AuthRoomResponse, isAuthRoomResponse } from 'shared/src/rooms/AuthRoom';
import { ChatRoomResponse, isChatRoomResponse } from 'shared/src/rooms/ChatRoom';
import { MapRoomResponse, isMapRoomResponse } from 'shared/src/rooms/MapRoom';
import { MapState } from 'shared/src/states/MapState';
import { CustomProtocol, Protocol } from 'shared/src/types/Colyseus';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { ProfessionType, zProfessionType } from 'shared/src/types/Profession';
import { Room as TRoom } from 'shared/src/types/Room';
import { Direction, Position, SceneData } from 'shared/src/types/SceneData';
import { Statistics } from 'shared/src/types/Statistic';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { StatisticMgt } from 'shared/src/utils/statisticMgt';
import { TalentMgt } from 'shared/src/utils/talentMgt';
import { match } from 'ts-pattern';
import { Store } from './Store';

export class ColyseusStore {
   private _client: Client;

   private _authRoom: Room | null = null;

   private _chatRoom: Room | null = null;

   private _gameRoom: Room<MapState> | null = null;

   private _store: Store;

   private _uuid: string | null = null;

   public changingMap = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._client = new Client(import.meta.env.VITE_SERVER_WEBSOCKET_URL);
      this._store = store;
   }

   reset() {
      this._client = new Client(import.meta.env.VITE_SERVER_WEBSOCKET_URL);
      this._authRoom = null;
      this._chatRoom = null;
      this._gameRoom = null;
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

   createCharacter(characterName: string, profession: ProfessionType) {
      this.authRoom.send('createCharacter', { characterName, profession });
   }

   deleteCharacter(characterName: string, password: string) {
      this.authRoom.send('deleteCharacter', { characterName, password });
   }

   private async joinRoom(roomName: string, position?: Position, direction?: Direction) {
      if (this._authRoom !== null) {
         await this.leaveAuthRoom();
      } else if (this._gameRoom !== null) {
         await this.leaveGameRoom();
      }

      const room = await this._client.joinOrCreate<MapState>(roomName, {
         uuid: this.uuid,
         position,
         direction,
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
         .with({ status: 'error' }, ({ errorMessage, errorMessageOptions }) => {
            this._store.characterSelectionStore.setErrorMessage(errorMessage, errorMessageOptions);
            this._store.characterSelectionStore.setLoading(false);
         })
         .with(
            { status: 'success' },
            async ({
               map,
               posX,
               posY,
               direction,
               uuid,
               profession,
               talents,
               talentsPoints,
               baseStatistics,
               baseStatisticsPoints,
               experience,
               health,
            }) => {
               this.setUuid(uuid);
               await Promise.all([this.joinRoom(map), this.joinChatRoom()]);

               this._store.characterSelectionStore.setLoading(false);
               this._store.screenStore.setLoggedIn(true);
               this._store.settingsMenuStore.applyState(this._store.settingsMenuStore.savedState);

               const scene = await this._store.gameStore.changeMapPlayer(map, {
                  entrancePosition: { x: posX, y: posY },
                  entranceDirection: direction as Direction,
               });

               scene.gridEngine.setPosition(INTERNAL_PLAYER_NAME, { x: posX, y: posY }, 'player');

               this._store.characterStore.setName(
                  this._store.characterSelectionStore.selectedCharacter,
               );
               this._store.characterStore.setMap(map as TRoom);
               this._store.characterStore.setPosition({ x: posX, y: posY });
               this._store.characterStore.setPlayers([]);
               this._store.characterStore.setProfession(profession);
               this._store.characterStore.setTalents(TalentMgt.deserializeTalents(talents));
               this._store.characterStore.setTalentsPoints(talentsPoints);
               this._store.characterStore.setBaseStatistics(
                  StatisticMgt.deserializeStatistics(baseStatistics),
               );
               this._store.characterStore.setBaseStatisticsPoints(baseStatisticsPoints);
               this._store.characterStore.setExperience(experience);
               this._store.characterStore.setCurrentHealth(health);

               this._store.talentsMenuStore.setTalents(TalentMgt.deserializeTalents(talents));
               this._store.talentsMenuStore.setTalentsPoints(talentsPoints);

               this._store.statisticsMenuStore.setStatistics(
                  StatisticMgt.deserializeStatistics(baseStatistics),
               );
               this._store.statisticsMenuStore.setStatisticsPoints(baseStatisticsPoints);

               this._store.loadingScreenStore.setSceneVisible(true);
               this._store.discordStore.updateDiscordRichPresence();
            },
         )
         .exhaustive();
   }

   onCreateCharacterResponse(
      message: Extract<AuthRoomResponse, { type: 'createCharacterResponse' }>['message'],
   ) {
      this._store.characterCreationStore.reset();

      match(message)
         .with({ status: 'error' }, ({ errorMessage, errorMessageOptions }) => {
            this._store.characterCreationStore.setErrorMessage(errorMessage, errorMessageOptions);
         })
         .with({ status: 'success' }, async ({ characters }) => {
            this._store.characterCreationStore.reset();
            this._store.characterSelectionStore.setCharacters(characters);
            this._store.characterSelectionStore.setSuccessMessage('characterCreated');

            this._store.screenStore.setScreen('characterSelection');
         })
         .exhaustive();
   }

   onDeleteCharacterResponse(
      message: Extract<AuthRoomResponse, { type: 'deleteCharacterResponse' }>['message'],
   ) {
      this._store.characterSelectionStore.reset();

      match(message)
         .with({ status: 'error' }, ({ errorMessage, errorMessageOptions }) => {
            this._store.characterSelectionStore.setErrorMessage(errorMessage, errorMessageOptions);
         })
         .with({ status: 'success' }, ({ characters }) => {
            this._store.characterSelectionStore.setCharacters(characters);
            this._store.characterSelectionStore.setSuccessMessage('characterDeleted');
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
               .with({ type: 'privateMessage' }, ({ message: payloadMessage }) => {
                  this.onPrivateMessage(payloadMessage);
               })
               .exhaustive();
         }
      });
   }

   onMessage(message: Extract<ChatRoomResponse, { type: 'message' }>['message']) {
      this._store.chatStore.addMessage(message);
   }

   onPrivateMessage(message: Extract<ChatRoomResponse, { type: 'privateMessage' }>['message']) {
      this._store.chatStore.addPrivateMessage(message);
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
                  this.onChangeMap(payloadMessage);
               })
               .with({ type: 'fightPvE' }, ({ message: payloadMessage }) => {
                  this.onFightPvE(payloadMessage);
               })
               .exhaustive();
         }
      });

      this.gameRoom.state.players.onAdd(async (player) => {
         const { name, profession, x, y, direction } = player;
         const isPlayer = name === this._store.characterStore.name;

         if (!isPlayer) {
            const scene = await this._store.gameStore.getCurrentScene();
            scene.addExternalPlayer(
               name,
               zProfessionType.parse(profession),
               { x, y },
               direction as Direction,
            );

            player.listen('x', (newX) => {
               scene.setNextX(name, newX);
            });

            player.listen('y', (newY) => {
               scene.setNextY(name, newY);
            });

            player.listen('direction', (newDirection) => {
               scene.setPlayerDirection(name, newDirection as Direction);
            });

            player.listen('isFight', (isFight) => {
               scene.setCharacterFighting(name, isFight);
            });
         }
      });

      this.gameRoom.state.players.onRemove(async (player) => {
         const { name } = player;
         const isPlayer = name === this._store.characterStore.name;

         if (!isPlayer) {
            const scene = await this._store.gameStore.getCurrentScene();
            scene.deleteExternalPlayer(name);
         }
      });
   }

   movePlayer(x: number, y: number) {
      this.gameRoom.send('move', { x, y });
   }

   stopMoving(direction: Direction, { x, y }: Position) {
      this.gameRoom.send('stopMoving', { direction, x, y });
   }

   updateTalents(talents: number[]) {
      this.gameRoom.send('updateTalents', { talents: TalentMgt.serializeTalents(talents) });
   }

   updateStatistics(statistics: Partial<Statistics>) {
      this.gameRoom.send('updateStatistics', {
         statistics: StatisticMgt.serializeStatistics(statistics),
      });
   }

   fightPvE(monsterGroupId: number) {
      this.gameRoom.send('fightPvE', { monsterGroupId });
   }

   stopFighting() {
      this.gameRoom.send('stopFighting', {});
   }

   async onChangeMap({
      map,
      x,
      y,
      direction,
   }: Extract<MapRoomResponse, { type: 'changeMap' }>['message']) {
      this._store.gameStore.enableKeyboard(false);

      const scene = await this._store.gameStore.getCurrentScene();
      scene.fadeOut((_, progress) => {
         if (progress === 1) {
            this.setChangingMap(true);

            const sceneData: SceneData = {
               entrancePosition: { x, y },
               entranceDirection: direction as Direction,
            };
            scene.scene.start(map, sceneData);
         }
      }, true);

      await this.joinRoom(map, { x, y }, direction as Direction);

      this.setChangingMap(false);

      this._store.characterStore.setMap(map as TRoom);
      this._store.gameStore.enableKeyboard(true);
      this._store.discordStore.updateDiscordRichPresence();
   }

   async onFightPvE({ results }: Extract<MapRoomResponse, { type: 'fightPvE' }>['message']) {
      const scene = await this._store.gameStore.getCurrentScene();
      console.log(results);
      scene.fadeOut((_, progress) => {
         if (progress === 1) {
            this._store.pveFightStore.setFightResults(results);
            scene.scene.pause(this._store.characterStore.map);
            scene.scene.launch('PvEFightScene');
         }
      });
   }

   private async onWebSocketClosed(code: number) {
      if (code !== Protocol.WS_CLOSE_CONSENTED) {
         this._store.screenStore.setLoggedIn(false);
         this._store.screenStore.setScreen('login');

         this._store.characterCreationStore.reset();
         this._store.characterSelectionStore.reset();

         if (code === CustomProtocol.DISCONNECT_FROM_OTHER_SESSION) {
            this._store.loginStore.setErrorMessage('loginInvalidation');
         } else {
            this._store.loginStore.setErrorMessage('serverDisconnection', {
               code: code.toString(),
            });
         }

         this.reset();
      }
   }
}
