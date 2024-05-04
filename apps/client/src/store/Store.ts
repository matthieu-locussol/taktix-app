import { makeAutoObservable } from 'mobx';
import { CharacterCreationStore } from './CharacterCreationStore';
import { CharacterSelectionStore } from './CharacterSelectionStore';
import { CharacterStore } from './CharacterStore';
import { ChatStore } from './ChatStore';
import { ColyseusStore } from './ColyseusStore';
import { CommunityMenuStore } from './CommunityMenuStore';
import { ContextMenuStore } from './ContextMenuStore';
import { DialogMenuStore } from './DialogMenuStore';
import { DiscordStore } from './DiscordStore';
import { GameStore } from './GameStore';
import { HudStore } from './HudStore';
import { InventoryMenuStore } from './InventoryMenuStore';
import { LoadingScreenStore } from './LoadingScreenStore';
import { LoginStore } from './LoginStore';
import { MapMenuStore } from './MapMenuStore';
import { NewsStore } from './NewsStore';
import { PvEFightStore } from './PvEFightStore';
import { RegisterStore } from './RegisterStore';
import { ScreenStore } from './ScreenStore';
import { SettingsMenuStore } from './SettingsMenuStore';
import { StatisticsMenuStore } from './StatisticsMenuStore';
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

   public dialogMenuStore: DialogMenuStore;

   public discordStore: DiscordStore;

   public gameStore: GameStore;

   public hudStore: HudStore;

   public inventoryMenuStore: InventoryMenuStore;

   public loadingScreenStore: LoadingScreenStore;

   public loginStore: LoginStore;

   public mapMenuStore: MapMenuStore;

   public newsStore: NewsStore;

   public pveFightStore: PvEFightStore;

   public registerStore: RegisterStore;

   public screenStore: ScreenStore;

   public settingsMenuStore: SettingsMenuStore;

   public statisticsMenuStore: StatisticsMenuStore;

   public talentsMenuStore: TalentsMenuStore;

   public updaterStore: UpdaterStore;

   constructor() {
      makeAutoObservable(this);

      this.characterStore = new CharacterStore(this);
      this.characterCreationStore = new CharacterCreationStore();
      this.characterSelectionStore = new CharacterSelectionStore();
      this.chatStore = new ChatStore(this);
      this.colyseusStore = new ColyseusStore(this);
      this.communityMenuStore = new CommunityMenuStore(this);
      this.contextMenuStore = new ContextMenuStore(this);
      this.dialogMenuStore = new DialogMenuStore(this);
      this.discordStore = new DiscordStore(this);
      this.gameStore = new GameStore(this);
      this.hudStore = new HudStore(this);
      this.inventoryMenuStore = new InventoryMenuStore(this);
      this.loadingScreenStore = new LoadingScreenStore();
      this.loginStore = new LoginStore();
      this.mapMenuStore = new MapMenuStore(this);
      this.newsStore = new NewsStore(this);
      this.pveFightStore = new PvEFightStore(this);
      this.registerStore = new RegisterStore();
      this.screenStore = new ScreenStore(this);
      this.settingsMenuStore = new SettingsMenuStore(this);
      this.statisticsMenuStore = new StatisticsMenuStore(this);
      this.talentsMenuStore = new TalentsMenuStore(this);
      this.updaterStore = new UpdaterStore(this);
   }
}
