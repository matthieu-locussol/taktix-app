import type { Store } from './Store';

import { makeAutoObservable } from 'mobx';
import { ZodMgt } from 'shared/src/utils/zodMgt';
import { z } from 'zod';

const sounds = ['attack', 'check', 'death', 'evade', 'sleep', 'teleport'] as const;

const zSound = ZodMgt.constructZodLiteralUnionType(sounds.map((sound) => z.literal(sound)));

type Sound = z.infer<typeof zSound>;

export class SoundsStore {
   private _store: Store;

   private _sounds = new Map<Sound, HTMLAudioElement>();

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;

      for (const sound of sounds) {
         this._sounds.set(sound, new Audio(`/assets/sounds/${sound}.mp3`));
      }

      this.adjustSoundsVolume(this._store.settingsMenuStore.volume / 100);
   }

   adjustSoundsVolume(volume: number): void {
      for (const sound of sounds) {
         const soundObject = this._sounds.get(sound);

         if (soundObject !== undefined) {
            soundObject.volume = volume;
         }
      }
   }

   play(sound: Sound): void {
      const soundObject = this._sounds.get(sound);

      if (soundObject !== undefined) {
         const clonedSoundObject = soundObject.cloneNode(false) as HTMLAudioElement;

         clonedSoundObject.volume = soundObject.volume;
         clonedSoundObject.play();
      }
   }
}
