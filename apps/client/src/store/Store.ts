import { makeAutoObservable } from 'mobx';
import { CharacterStore } from './CharacterStore';
import { ChatStore } from './ChatStore';
import { LoadingScreenStore } from './LoadingScreenStore';

export class Store {
   loadingScreenStore = new LoadingScreenStore();

   characterStore = new CharacterStore();

   chatStore = new ChatStore();

   constructor() {
      makeAutoObservable(this);
   }
}
