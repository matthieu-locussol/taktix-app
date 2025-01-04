import { makeAutoObservable } from 'mobx';

import { CharacterCreationStore } from './CharacterCreationStore.ts';
import { CharacterSelectionStore } from './CharacterSelectionStore.ts';
import { CharacterStore } from './CharacterStore.ts';
import { ChatStore } from './ChatStore.ts';
import { ColyseusStore } from './ColyseusStore.ts';
import { CommunityMenuStore } from './CommunityMenuStore.ts';
import { ContextMenuStore } from './ContextMenuStore.ts';
import { DialogMenuStore } from './DialogMenuStore.ts';
import { DiscordStore } from './DiscordStore.ts';
import { GameStore } from './GameStore.ts';
import { GatchaMenuStore } from './GatchaMenuStore.ts';
import { HudStore } from './HudStore.ts';
import { InventoryMenuStore } from './InventoryMenuStore.ts';
import { LoadingScreenStore } from './LoadingScreenStore.ts';
import { LoginStore } from './LoginStore.ts';
import { MapMenuStore } from './MapMenuStore.ts';
import { NewsStore } from './NewsStore.ts';
import { PvEFightStore } from './PvEFightStore.ts';
import { RegisterStore } from './RegisterStore.ts';
import { ScreenStore } from './ScreenStore.ts';
import { SettingsMenuStore } from './SettingsMenuStore.ts';
import { SoundsStore } from './SoundsStore.ts';
import { StatisticsMenuStore } from './StatisticsMenuStore.ts';
import { TalentsMenuStore } from './TalentsMenuStore.ts';
import { UpdaterStore } from './UpdaterStore.ts';

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

   public gatchaMenuStore: GatchaMenuStore;

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

   public soundsStore: SoundsStore;

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
      this.gatchaMenuStore = new GatchaMenuStore(this);
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
      this.soundsStore = new SoundsStore(this);
      this.statisticsMenuStore = new StatisticsMenuStore(this);
      this.talentsMenuStore = new TalentsMenuStore(this);
      this.updaterStore = new UpdaterStore(this);
   }
}
