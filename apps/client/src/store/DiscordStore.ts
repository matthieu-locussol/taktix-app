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
         const { mapName, name, profession /* level */ } = this._store.characterStore;
         const level = 1;

         setDiscordRichPresence({
            details: `In: ${mapName}`,
            state: 'Playing',
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            small_image: profession.toLocaleLowerCase(),
            small_text: `${name} - Level ${level}`,
            timestamp: this.startTimestamp,
         });
      }
   }
}
