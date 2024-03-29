import { makeAutoObservable } from 'mobx';
import { CharacterCreationStore } from './CharacterCreationStore';
import { CharacterSelectionStore } from './CharacterSelectionStore';
import { CharacterStore } from './CharacterStore';
import { ChatStore } from './ChatStore';
import { ColyseusStore } from './ColyseusStore';
import { CommunityMenuStore } from './CommunityMenuStore';
import { ContextMenuStore } from './ContextMenuStore';
import { DiscordStore } from './DiscordStore';
import { GameStore } from './GameStore';
import { HudStore } from './HudStore';
import { LoadingScreenStore } from './LoadingScreenStore';
import { LoginStore } from './LoginStore';
import { NewsStore } from './NewsStore';
import { RegisterStore } from './RegisterStore';
import { ScreenStore } from './ScreenStore';
import { SettingsMenuStore } from './SettingsMenuStore';
import { StatisticsStore } from './StatisticsStore';
import { TalentsMenuStore } from './TalentsMenuStore';
import { UpdaterStore } from './UpdaterStore';

export class Store {
   public characterStore: CharacterStore;

   public characterCreationStore: CharacterCreationStore;

   public characterSelectionStore: CharacterSelectionStore;

   public chatStore: ChatStore;

   public colyseusStore: ColyseusStore;

   public communityMenuStore: CommunityMenuStore;

   public contextMenuStore: ContextMenuStore;

   public discordStore: DiscordStore;

   public gameStore: GameStore;

   public hudStore: HudStore;

   public loadingScreenStore: LoadingScreenStore;

   public loginStore: LoginStore;

   public newsStore: NewsStore;

   public registerStore: RegisterStore;

   public screenStore: ScreenStore;

   public settingsMenuStore: SettingsMenuStore;

   public statisticsStore: StatisticsStore;

   public talentsMenuStore: TalentsMenuStore;

   public updaterStore: UpdaterStore;

   constructor() {
      makeAutoObservable(this);

      this.characterStore = new CharacterStore();
      this.characterCreationStore = new CharacterCreationStore();
      this.characterSelectionStore = new CharacterSelectionStore();
      this.chatStore = new ChatStore(this);
      this.colyseusStore = new ColyseusStore(this);
      this.communityMenuStore = new CommunityMenuStore(this);
      this.contextMenuStore = new ContextMenuStore(this);
      this.discordStore = new DiscordStore(this);
      this.gameStore = new GameStore(this);
      this.hudStore = new HudStore(this);
      this.loadingScreenStore = new LoadingScreenStore();
      this.loginStore = new LoginStore();
      this.newsStore = new NewsStore(this);
      this.registerStore = new RegisterStore();
      this.screenStore = new ScreenStore(this);
      this.settingsMenuStore = new SettingsMenuStore(this);
      this.statisticsStore = new StatisticsStore(this);
      this.talentsMenuStore = new TalentsMenuStore(this);
      this.updaterStore = new UpdaterStore(this);
   }
}
