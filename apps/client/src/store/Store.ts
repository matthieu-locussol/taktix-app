import { makeAutoObservable } from 'mobx';
import { _assert } from 'shared/src/utils/_assert';
import { CharacterStore } from './CharacterStore';
import { ChatStore } from './ChatStore';
import { GameStore } from './GameStore';
import { LoadingScreenStore } from './LoadingScreenStore';
import { SocketStore } from './SocketStore';
import { UpdaterStore } from './UpdaterStore';

export class Store {
   public characterStore: CharacterStore;

   public chatStore: ChatStore;

   public gameStore: GameStore;

   public loadingScreenStore: LoadingScreenStore;

   public updaterStore: UpdaterStore;

   private _socketStore: SocketStore | null;

   constructor() {
      makeAutoObservable(this);

      this.characterStore = new CharacterStore();
      this.chatStore = new ChatStore();
      this.gameStore = new GameStore(this);
      this.loadingScreenStore = new LoadingScreenStore();
      this.updaterStore = new UpdaterStore();

      this._socketStore = null;
   }

   get socketStore() {
      _assert(this._socketStore, 'SocketStore has not been initialized yet!');
      return this._socketStore;
   }

   initialize(nickname: string) {
      this._socketStore = new SocketStore(this, nickname);
   }
}
