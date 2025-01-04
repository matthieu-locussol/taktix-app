import type { TranslationKey } from 'shared/src/data/translations.ts';
import type { Store } from './Store.ts';

import { t } from 'i18next';
import { makeAutoObservable } from 'mobx';
import { LevelMgt } from 'shared/src/utils/levelMgt.ts';

import { setDiscordRichPresence } from '../utils/discord.ts';
import { isTauri } from '../utils/tauri.ts';
import { getVersion } from '../utils/version.ts';

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
            details: t('inMenu' satisfies TranslationKey),
            state: t(screen satisfies TranslationKey),
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            timestamp: this.startTimestamp,
         });
      } else if (fightOngoing) {
         const { map, name, profession, experience } = this._store.characterStore;
         const level = LevelMgt.getLevel(experience);

         setDiscordRichPresence({
            details: t('inMap', { map: t(map satisfies TranslationKey) }),
            state: t('fighting' satisfies TranslationKey),
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            small_image: profession.toLocaleLowerCase(),
            small_text: `${name} - ${t('level', { level })}`,
            timestamp: this._store.pveFightStore.startTimestamp,
         });
      } else {
         const { map, name, profession, experience } = this._store.characterStore;
         const level = LevelMgt.getLevel(experience);

         setDiscordRichPresence({
            details: t('inMap', { map: t(map satisfies TranslationKey) }),
            state: t('playing' satisfies TranslationKey),
            large_image: 'default',
            large_text: `Taktix - ${getVersion()}`,
            small_image: profession.toLocaleLowerCase(),
            small_text: `${name} - ${t('level', { level })}`,
            timestamp: this.startTimestamp,
         });
      }
   }
}
