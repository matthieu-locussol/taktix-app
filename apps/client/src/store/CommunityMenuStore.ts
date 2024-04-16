import { makeAutoObservable, runInAction } from 'mobx';
import { CommunitySchema, zCommunitySchema } from 'shared/src/schemas/CommunitySchema';
import { TimeMgt } from 'shared/src/utils/timeMgt';
import { Store } from './Store';

export class CommunityMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public loading: boolean = false;

   public players: CommunitySchema['players'] = [];

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public async fetchPlayers() {
      runInAction(() => {
         this.loading = true;
      });

      try {
         const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/community`);
         const json = await response.json();
         const { players } = zCommunitySchema.parse(json);

         runInAction(() => {
            this.players = players;
            this.loading = false;
         });
      } catch (_error) {
         runInAction(() => {
            this.players = [];
            this.loading = false;
         });
      }
   }

   public open(): void {
      this.isOpened = true;
      this.fetchPlayers();
   }

   public close(): void {
      this.isOpened = false;
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }

   public sendPrivateMessage(playerName: string) {
      const isCurrentCharacter = this._store.characterStore.name === playerName;

      if (!isCurrentCharacter) {
         this._store.chatStore.setInput(`/w ${playerName} `);

         TimeMgt.wait(100).then(() => {
            if (this._store.chatStore.inputRef !== null) {
               this._store.chatStore.inputRef.focus();
            }
         });
      }
   }

   public get sortedPlayers() {
      const { name } = this._store.characterStore;
      const players = this.players.slice();

      players.sort((a, b) => {
         if (a.player === name) {
            return -1;
         }

         if (b.player === name) {
            return 1;
         }

         return a.player.localeCompare(b.player);
      });

      return players;
   }

   public get playerCount() {
      return this.players.length;
   }
}
