import { Client, Room } from 'colyseus.js';
import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';
import { CharacterSprite } from 'shared/src/data/charactersSprites';
import { TranslationKey } from 'shared/src/data/translations';
import { AuthRoomResponse, isAuthRoomResponse } from 'shared/src/rooms/AuthRoom';
import { ChatRoomResponse, isChatRoomResponse } from 'shared/src/rooms/ChatRoom';
import { MapRoomResponse, isMapRoomResponse } from 'shared/src/rooms/MapRoom';
import { MapState } from 'shared/src/states/MapState';
import { Channel } from 'shared/src/types/Channel';
import { CustomProtocol, Protocol } from 'shared/src/types/Colyseus';
import { Interaction } from 'shared/src/types/Interaction';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { ProfessionType } from 'shared/src/types/Profession';
import { Room as TRoom } from 'shared/src/types/Room';
import { Direction, Position, SceneData } from 'shared/src/types/SceneData';
import { Statistics } from 'shared/src/types/Statistic';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { ArrayMgt } from 'shared/src/utils/arrayMgt';
import { ItemMgt } from 'shared/src/utils/itemMgt';
import { StatisticMgt } from 'shared/src/utils/statisticMgt';
import { StringMgt } from 'shared/src/utils/stringMgt';
import { TalentMgt } from 'shared/src/utils/talentMgt';
import { TimeMgt } from 'shared/src/utils/timeMgt';
import { match } from 'ts-pattern';
import { Store } from './Store';

const CHECK_INTERVAL = 10;
const MAX_CHECK_ATTEMPTS = 1_000;

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

   createCharacter(
      characterName: string,
      profession: ProfessionType,
      spritesheet: CharacterSprite,
   ) {
      this.authRoom.send('createCharacter', { characterName, profession, spritesheet });
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
               spritesheet,
               talents,
               talentsPoints,
               baseStatistics,
               baseStatisticsPoints,
               experience,
               health,
               teleporters,
               money,
               gachix,
               items,
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
               this._store.characterStore.setProfession(profession);
               this._store.characterStore.setSpritesheet(spritesheet);
               this._store.characterStore.setTalents(TalentMgt.deserializeTalents(talents));
               this._store.characterStore.setTalentsPoints(talentsPoints);
               this._store.characterStore.setBaseStatistics(
                  StatisticMgt.deserializeStatistics(baseStatistics),
               );
               this._store.characterStore.setBaseStatisticsPoints(baseStatisticsPoints);
               this._store.characterStore.setExperience(experience);
               this._store.characterStore.setCurrentHealth(health);
               this._store.characterStore.setTeleporters(
                  StringMgt.deserializeTeleporters(teleporters),
               );
               this._store.characterStore.setMoney(money);
               this._store.characterStore.setGachix(gachix);
               this._store.characterStore.setItems(
                  items.map((item) => ItemMgt.deserializeItem(item)),
               );

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
               .with({ type: 'equipItemResponse' }, ({ message: payloadMessage }) => {
                  this.onEquipItemResponse(payloadMessage);
               })
               .with({ type: 'unequipItemResponse' }, ({ message: payloadMessage }) => {
                  this.onUnequipItemResponse(payloadMessage);
               })
               .with({ type: 'interactResponse' }, ({ message: payloadMessage }) => {
                  this.onInteractResponse(payloadMessage);
               })
               .with({ type: 'recycleResponse' }, ({ message: payloadMessage }) => {
                  this.onRecycleResponse(payloadMessage);
               })
               .with({ type: 'spinWheelResponse' }, ({ message: payloadMessage }) => {
                  this.onSpinWheelResponse(payloadMessage);
               })
               .exhaustive();
         }
      });

      this.gameRoom.state.players.onAdd(async (player) => {
         this._store.gameStore.addPlayerToQueue(player);
      });

      this.gameRoom.state.players.onRemove(async (player) => {
         this._store.gameStore.removePlayerFromQueue(player);
      });

      this.gameRoom.state.fights.onAdd(async (fight) => {
         this._store.gameStore.addFightToQueue(fight);
      });

      this.gameRoom.state.fights.onRemove(async (fight) => {
         this._store.gameStore.removeFightFromQueue(fight);
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

   fightPvE(id: string, monsterGroupId: number) {
      this.gameRoom.send('fightPvE', { id, monsterGroupId });
   }

   stopFighting() {
      this.gameRoom.send('stopFighting', {});
   }

   teleport(room: TRoom) {
      this.gameRoom.send('teleport', { room });
   }

   equipItem(id: number) {
      this.gameRoom.send('equipItem', { id });
   }

   unequipItem(id: number) {
      this.gameRoom.send('unequipItem', { id });
   }

   interact(interaction: Interaction) {
      this.gameRoom.send('interact', { id: interaction });
   }

   recycle(itemsIds: number[]) {
      this.gameRoom.send('recycle', { itemsIds });
   }

   spinWheel() {
      this.gameRoom.send('spinWheel', {});
   }

   async onChangeMap({
      map,
      x,
      y,
      direction,
      money,
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

      let attempts = 0;
      while (attempts < MAX_CHECK_ATTEMPTS) {
         attempts += 1;

         if (this._store.gameStore.game.scene.isActive(map)) {
            break;
         }

         await TimeMgt.wait(CHECK_INTERVAL);
      }

      await this.joinRoom(map, { x, y }, direction as Direction);

      this.setChangingMap(false);

      this._store.characterStore.setMap(map as TRoom);
      this._store.gameStore.enableKeyboard(true);
      this._store.discordStore.updateDiscordRichPresence();

      if (money !== undefined) {
         this._store.characterStore.setMoney(this._store.characterStore.money - money);
      }
   }

   async onFightPvE({
      results,
      alliesMoney,
   }: Extract<MapRoomResponse, { type: 'fightPvE' }>['message']) {
      const scene = await this._store.gameStore.getCurrentScene();
      scene.fadeOut((_, progress) => {
         if (progress === 1) {
            this._store.pveFightStore.setFightResults(results);
            this._store.pveFightStore.setAlliesMoney(alliesMoney);
            scene.scene.pause(this._store.characterStore.map);
            scene.scene.launch('PvEFightScene');
         }
      });
   }

   async onEquipItemResponse({
      success,
   }: Extract<MapRoomResponse, { type: 'equipItemResponse' }>['message']) {
      if (!success) {
         this._store.chatStore.addMessage({
            channel: Channel.SERVER,
            content: i18next.t('itemNotEquipped'),
            author: i18next.t('Server' satisfies TranslationKey),
         });
      }
   }

   async onUnequipItemResponse({
      success,
   }: Extract<MapRoomResponse, { type: 'unequipItemResponse' }>['message']) {
      if (!success) {
         this._store.chatStore.addMessage({
            channel: Channel.SERVER,
            content: i18next.t('itemNotUnequipped'),
            author: i18next.t('Server' satisfies TranslationKey),
         });
      }
   }

   async onInteractResponse({
      id,
      success,
   }: Extract<MapRoomResponse, { type: 'interactResponse' }>['message']) {
      if (!success) {
         this._store.chatStore.addMessage({
            channel: Channel.SERVER,
            content: i18next.t('interactionImpossible'),
            author: i18next.t('Server' satisfies TranslationKey),
         });
      } else {
         switch (id) {
            case 'Sleep':
               {
                  this._store.soundsStore.play('sleep');
                  this._store.characterStore.setCurrentHealth(this._store.characterStore.maxHealth);
               }
               break;
            case 'SaveTeleporter':
               {
                  this._store.characterStore.setTeleporters(
                     ArrayMgt.makeUnique([
                        ...this._store.characterStore.teleporters,
                        this._store.characterStore.map,
                     ]),
                  );

                  this._store.chatStore.addMessage({
                     channel: Channel.SERVER,
                     content: i18next.t('teleporterSaved' satisfies TranslationKey),
                     author: 'Server',
                  });
               }
               break;
            default:
               throw new Error(`Unknown interaction id: '${id}'`);
         }
      }
   }

   async onRecycleResponse({
      success,
      gachix,
      itemsDestroyed,
   }: Extract<MapRoomResponse, { type: 'recycleResponse' }>['message']) {
      if (success) {
         this._store.characterStore.addGachix(gachix);
         this._store.characterStore.setItems(
            this._store.characterStore.items.filter((item) => !itemsDestroyed.includes(item.id)),
         );
         this._store.inventoryMenuStore.setObtainedGachix(gachix);
         this._store.inventoryMenuStore.openGachixGainedDialog();
         this._store.inventoryMenuStore.closeRecycleDialog();
      } else {
         this._store.chatStore.addMessage({
            channel: Channel.SERVER,
            content: i18next.t('recycleImpossible'),
            author: i18next.t('Server' satisfies TranslationKey),
         });
      }
   }

   async onSpinWheelResponse({
      success,
      item,
      itemRarity,
      lootBonus,
   }: Extract<MapRoomResponse, { type: 'spinWheelResponse' }>['message']) {
      if (success) {
         _assert(item, 'Item should be defined');
         _assert(itemRarity, 'Item rarity should be defined');
         _assert(lootBonus, 'Loot bonus should be defined');

         this._store.gatchaMenuStore.setLootBonus(lootBonus);
         this._store.gatchaMenuStore.setGainedRarity(itemRarity);
         this._store.gatchaMenuStore.startSpin(item);
         this._store.characterStore.removeGachix(1);
         this._store.characterStore.addItems([item]);
      } else {
         this._store.chatStore.addMessage({
            channel: Channel.SERVER,
            content: i18next.t('spinWheelImpossible'),
            author: i18next.t('Server' satisfies TranslationKey),
         });
      }
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
