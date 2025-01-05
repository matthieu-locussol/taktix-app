import type { TranslationKey } from 'shared/src/data/translations.ts';
import type { AuthRoomUserData } from 'shared/src/rooms/AuthRoom.ts';

import { makeAutoObservable } from 'mobx';

export class CharacterSelectionStore {
   public password: string = '';

   public errorMessage: TranslationKey | '' = '';

   public errorMessageOptions: Record<string, string> = {};

   public successMessage: TranslationKey | '' = '';

   public loading: boolean = false;

   public loadingDeleteCharacter: boolean = false;

   public characters: AuthRoomUserData['characters'] = [];

   public selectedCharacter: string = '';

   public characterToDelete: string = '';

   public openDeleteDialog: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   setPassword(password: string) {
      this.password = password;
   }

   setErrorMessage(errorMessage: TranslationKey | '', options: Record<string, string> = {}) {
      this.successMessage = '';
      this.errorMessage = errorMessage;
      this.errorMessageOptions = options;
   }

   setSuccessMessage(successMessage: TranslationKey | '') {
      this.errorMessage = '';
      this.successMessage = successMessage;
   }

   setLoading(loading: boolean) {
      this.loading = loading;
   }

   setLoadingDeleteCharacter(loadingDeleteCharacter: boolean) {
      this.loadingDeleteCharacter = loadingDeleteCharacter;
   }

   setCharacters(characters: AuthRoomUserData['characters']) {
      this.characters = characters.sort((a, b) => b.experience - a.experience);
   }

   setSelectedCharacter(selectedCharacter: string) {
      this.selectedCharacter = selectedCharacter;
   }

   setCharacterToDelete(characterToDelete: string) {
      this.characterToDelete = characterToDelete;
   }

   isSelectedCharacter(characterName: string) {
      return this.selectedCharacter === characterName;
   }

   openDeleteCharacterDialog(characterName: string) {
      this.setSelectedCharacter('');
      this.setCharacterToDelete(characterName);
      this.openDeleteDialog = true;
   }

   closeDeleteCharacterDialog() {
      this.openDeleteDialog = false;
   }

   reset() {
      this.setPassword('');
      this.setErrorMessage('');
      this.setSuccessMessage('');
      this.closeDeleteCharacterDialog();
      this.setLoading(false);
      this.setLoadingDeleteCharacter(false);
   }

   get canSubmit() {
      return this.selectedCharacter !== '' && !this.loading;
   }

   get canDeleteCharacter() {
      return this.characterToDelete !== '' && this.password !== '' && !this.loadingDeleteCharacter;
   }
}
