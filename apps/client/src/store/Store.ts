import { makeAutoObservable } from 'mobx';
import { CharacterStore } from './CharacterStore';
import { LoadingScreenStore } from './LoadingScreenStore';

export class Store {
   loadingScreenStore = new LoadingScreenStore();

   characterStore = new CharacterStore();

   constructor() {
      makeAutoObservable(this);
   }
}
