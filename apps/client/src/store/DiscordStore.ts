import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';
import { TranslationKey } from 'shared/src/data/translations';
import { LevelMgt } from 'shared/src/utils/levelMgt';
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

      const { loggedIn, screen } = this._store.screenStore;
      const { fightOngoing } = this._store.pveFightStore;

      if (!loggedIn) {
         setDiscordRichPresence({
            details: i18next.t('inMenu' satisfies TranslationKey),
            state: i18next.t(screen satisfies TranslationKey),
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            timestamp: this.startTimestamp,
         });
      } else if (fightOngoing) {
         const { map, name, profession, experience } = this._store.characterStore;
         const level = LevelMgt.getLevel(experience);

         setDiscordRichPresence({
            details: i18next.t('inMap', { map: i18next.t(map satisfies TranslationKey) }),
            state: i18next.t('fighting' satisfies TranslationKey),
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            small_image: profession.toLocaleLowerCase(),
            small_text: `${name} - ${i18next.t('level', { level })}`,
            timestamp: this._store.pveFightStore.startTimestamp,
         });
      } else {
         const { map, name, profession, experience } = this._store.characterStore;
         const level = LevelMgt.getLevel(experience);

         setDiscordRichPresence({
            details: i18next.t('inMap', { map: i18next.t(map satisfies TranslationKey) }),
            state: i18next.t('playing' satisfies TranslationKey),
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            small_image: profession.toLocaleLowerCase(),
            small_text: `${name} - ${i18next.t('level', { level })}`,
            timestamp: this.startTimestamp,
         });
      }
   }
}
