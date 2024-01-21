import { makeAutoObservable } from 'mobx';
import { _assert } from 'shared/src/utils/_assert';
import { CharacterCreationStore } from './CharacterCreationStore';
import { CharacterSelectionStore } from './CharacterSelectionStore';
import { CharacterStore } from './CharacterStore';
import { ChatStore } from './ChatStore';
import { ColyseusStore } from './ColyseusStore';
import { GameStore } from './GameStore';
import { LoadingScreenStore } from './LoadingScreenStore';
import { LoginStore } from './LoginStore';
import { NewsStore } from './NewsStore';
import { RegisterStore } from './RegisterStore';
import { ScreenStore } from './ScreenStore';
import { SocketStore } from './SocketStore';
import { UpdaterStore } from './UpdaterStore';

export class Store {
   public characterStore: CharacterStore;

   public characterCreationStore: CharacterCreationStore;

   public characterSelectionStore: CharacterSelectionStore;

   public chatStore: ChatStore;

   public colyseusStore: ColyseusStore;

   public gameStore: GameStore;

   public loadingScreenStore: LoadingScreenStore;

   public loginStore: LoginStore;

   public newsStore: NewsStore;

   public registerStore: RegisterStore;

   public screenStore: ScreenStore;

   public updaterStore: UpdaterStore;

   private _socketStore: SocketStore | null;

   constructor() {
      makeAutoObservable(this);

      this.characterStore = new CharacterStore();
      this.characterCreationStore = new CharacterCreationStore();
      this.characterSelectionStore = new CharacterSelectionStore();
      this.chatStore = new ChatStore();
      this.colyseusStore = new ColyseusStore(this);
      this.gameStore = new GameStore(this);
      this.loadingScreenStore = new LoadingScreenStore();
      this.loginStore = new LoginStore();
      this.newsStore = new NewsStore();
      this.registerStore = new RegisterStore();
      this.screenStore = new ScreenStore();
      this.updaterStore = new UpdaterStore();

      this._socketStore = null;
   }

   get socketStore() {
      _assert(this._socketStore, 'SocketStore has not been initialized yet!');
      return this._socketStore;
   }

   initialize(username: string, password: string) {
      this._socketStore = new SocketStore(this, username, password);
   }
}
