import { makeAutoObservable } from 'mobx';
import { CharacterCreationStore } from './CharacterCreationStore';
import { CharacterSelectionStore } from './CharacterSelectionStore';
import { CharacterStore } from './CharacterStore';
import { ChatStore } from './ChatStore';
import { ColyseusStore } from './ColyseusStore';
import { DiscordStore } from './DiscordStore';
import { GameStore } from './GameStore';
import { HudStore } from './HudStore';
import { LoadingScreenStore } from './LoadingScreenStore';
import { LoginStore } from './LoginStore';
import { NewsStore } from './NewsStore';
import { RegisterStore } from './RegisterStore';
import { ScreenStore } from './ScreenStore';
import { UpdaterStore } from './UpdaterStore';

export class Store {
   public characterStore: CharacterStore;

   public characterCreationStore: CharacterCreationStore;

   public characterSelectionStore: CharacterSelectionStore;

   public chatStore: ChatStore;

   public colyseusStore: ColyseusStore;

   public discordStore: DiscordStore;

   public gameStore: GameStore;

   public hudStore: HudStore;

   public loadingScreenStore: LoadingScreenStore;

   public loginStore: LoginStore;

   public newsStore: NewsStore;

   public registerStore: RegisterStore;

   public screenStore: ScreenStore;

   public updaterStore: UpdaterStore;

   constructor() {
      makeAutoObservable(this);

      this.characterStore = new CharacterStore();
      this.characterCreationStore = new CharacterCreationStore();
      this.characterSelectionStore = new CharacterSelectionStore();
      this.chatStore = new ChatStore(this);
      this.colyseusStore = new ColyseusStore(this);
      this.discordStore = new DiscordStore(this);
      this.gameStore = new GameStore(this);
      this.hudStore = new HudStore(this);
      this.loadingScreenStore = new LoadingScreenStore();
      this.loginStore = new LoginStore();
      this.newsStore = new NewsStore();
      this.registerStore = new RegisterStore();
      this.screenStore = new ScreenStore(this);
      this.updaterStore = new UpdaterStore();
   }
}
