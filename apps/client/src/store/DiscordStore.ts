import { makeAutoObservable } from 'mobx';
import { setDiscordRichPresence } from '../utils/discord';
import { isTauri } from '../utils/tauri';
import { getVersion } from '../utils/version';
import { Store } from './Store';

export class DiscordStore {
   private _store: Store;

   private startTimestamp: number = Date.now();

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   updateDiscordRichPresence() {
      if (!isTauri()) {
         return;
      }

      const { loggedIn, screenName } = this._store.screenStore;

      if (!loggedIn) {
         setDiscordRichPresence({
            details: 'In Menu',
            state: screenName,
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            timestamp: this.startTimestamp,
         });
      } else {
         const { map, name /* level */ } = this._store.characterStore;
         const level = 1;

         setDiscordRichPresence({
            details: `In: ${map}`,
            state: 'Playing',
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            small_image: 'face',
            small_text: `${name} - Level ${level}`,
            timestamp: this.startTimestamp,
         });
      }
   }
}
