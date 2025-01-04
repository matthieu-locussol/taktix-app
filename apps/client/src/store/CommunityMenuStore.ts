import type { CommunitySchema } from 'shared/src/schemas/CommunitySchema.ts';
import type { Store } from './Store.ts';

import { makeAutoObservable, runInAction } from 'mobx';
import { zCommunitySchema } from 'shared/src/schemas/CommunitySchema.ts';
import { TimeMgt } from 'shared/src/utils/timeMgt.ts';

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
      } catch (error) {
         console.error(error);

         runInAction(() => {
            this.players = [];
            this.loading = false;
         });
      }
   }

   public setIsOpened(isOpened: boolean): void {
      this.isOpened = isOpened;
      this._store.soundsStore.play('check');
   }

   public open(): void {
      this.setIsOpened(true);
      this.fetchPlayers();
   }

   public close(): void {
      this.setIsOpened(false);
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
