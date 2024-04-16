import { ProfessionType } from 'shared/src/types/Profession';
import { describe, expect, it } from 'vitest';
import { CharacterSelectionStore } from './CharacterSelectionStore';

describe('CharacterSelectionStore', () => {
   it('should be initialized', () => {
      const store = new CharacterSelectionStore();

      expect(store).toBeDefined();
      expect(store.password).toEqual('');
      expect(store.errorMessage).toEqual('');
      expect(store.successMessage).toEqual('');
      expect(store.loading).toEqual(false);
      expect(store.loadingDeleteCharacter).toEqual(false);
      expect(store.characters).toHaveLength(0);
      expect(store.selectedCharacter).toEqual('');
      expect(store.characterToDelete).toEqual('');
      expect(store.openDeleteDialog).toEqual(false);
   });

   it('should set the password', () => {
      const store = new CharacterSelectionStore();
      store.setPassword('password');
      expect(store.password).toBe('password');
   });

   it('should set the error message', () => {
      const store = new CharacterSelectionStore();
      store.setErrorMessage('invalidPassword');
      expect(store.errorMessage).toBe('invalidPassword');
   });

   it('should set the success message', () => {
      const store = new CharacterSelectionStore();
      store.setSuccessMessage('accountCreated');
      expect(store.successMessage).toBe('accountCreated');
   });

   it('should set the loading', () => {
      const store = new CharacterSelectionStore();
      store.setLoading(true);
      expect(store.loading).toBe(true);
   });

   it('should set the loading delete character', () => {
      const store = new CharacterSelectionStore();
      store.setLoadingDeleteCharacter(true);
      expect(store.loadingDeleteCharacter).toBe(true);
   });

   it('should set the characters', () => {
      const store = new CharacterSelectionStore();
      store.setCharacters([
         {
            name: 'John',
            profession: ProfessionType.Archer,
            experience: 0,
         },
      ]);
      expect(store.characters).toEqual([
         {
            name: 'John',
            profession: ProfessionType.Archer,
            experience: 0,
         },
      ]);
   });

   it('should set the selected character', () => {
      const store = new CharacterSelectionStore();
      store.setSelectedCharacter('John');
      expect(store.selectedCharacter).toBe('John');
   });

   it('should set the character to delete', () => {
      const store = new CharacterSelectionStore();
      store.setCharacterToDelete('John');
      expect(store.characterToDelete).toBe('John');
   });

   it('should check if the character is selected', () => {
      const store = new CharacterSelectionStore();
      store.setSelectedCharacter('John');
      expect(store.isSelectedCharacter('John')).toBe(true);
      expect(store.isSelectedCharacter('Jane')).toBe(false);
   });

   it('should open the delete character dialog', () => {
      const store = new CharacterSelectionStore();
      store.openDeleteCharacterDialog('Jane');
      expect(store.openDeleteDialog).toBe(true);
      expect(store.characterToDelete).toBe('Jane');
   });

   it('should close the delete character dialog', () => {
      const store = new CharacterSelectionStore();
      store.closeDeleteCharacterDialog();
      expect(store.openDeleteDialog).toBe(false);
   });

   it('should reset the store', () => {
      const store = new CharacterSelectionStore();

      store.setPassword('password');
      store.setErrorMessage('invalidPassword');
      store.setSuccessMessage('accountCreated');
      store.setLoading(true);
      store.setLoadingDeleteCharacter(true);
      store.setCharacters([
         {
            name: 'John',
            profession: ProfessionType.Archer,
            experience: 0,
         },
      ]);
      store.setSelectedCharacter('John');
      store.setCharacterToDelete('John');
      store.openDeleteCharacterDialog('John');

      store.reset();

      expect(store.password).toEqual('');
      expect(store.errorMessage).toEqual('');
      expect(store.successMessage).toEqual('');
      expect(store.loading).toEqual(false);
      expect(store.loadingDeleteCharacter).toEqual(false);
      expect(store.selectedCharacter).toEqual('');
      expect(store.openDeleteDialog).toEqual(false);
   });

   it('should return true if the form can be submitted', () => {
      const store = new CharacterSelectionStore();

      expect(store.canSubmit).toBe(false);

      store.setSelectedCharacter('John');
      store.setLoading(false);

      expect(store.canSubmit).toBe(true);
   });

   it('should return true if the delete character form can be submitted', () => {
      const store = new CharacterSelectionStore();

      expect(store.canDeleteCharacter).toBe(false);

      store.setCharacterToDelete('John');
      store.setPassword('password');
      store.setLoadingDeleteCharacter(false);

      expect(store.canDeleteCharacter).toBe(true);
   });
});
