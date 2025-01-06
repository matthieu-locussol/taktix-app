import { ProfessionType } from 'shared/src/types/Profession';
import { describe, expect, it } from 'vitest';

import { CharacterCreationStore } from './CharacterCreationStore';

describe('CharacterCreationStore', () => {
   it('should be initialized', () => {
      const store = new CharacterCreationStore();

      expect(store).toBeDefined();
      expect(store.errorMessage).toEqual('');
      expect(store.name).toEqual('');
      expect(store.profession).toEqual(ProfessionType.Warrior);
      expect(store.loading).toEqual(false);
   });

   it('should set the name', () => {
      const store = new CharacterCreationStore();

      store.setName('John');
      expect(store.name).toBe('John');
   });

   it('should set the profession', () => {
      const store = new CharacterCreationStore();

      store.setProfession(ProfessionType.Mage);
      expect(store.profession).toBe(ProfessionType.Mage);
   });

   it('should set the loading', () => {
      const store = new CharacterCreationStore();

      store.setLoading(true);
      expect(store.loading).toBe(true);
   });

   it('should set the error message', () => {
      const store = new CharacterCreationStore();

      store.setErrorMessage('invalidPassword');
      expect(store.errorMessage).toBe('invalidPassword');
   });

   it('should reset the store', () => {
      const store = new CharacterCreationStore();

      store.setErrorMessage('invalidPassword');
      store.setName('John');
      store.setProfession(ProfessionType.Mage);
      store.setLoading(true);

      store.reset();

      expect(store.errorMessage).toBe('');
      expect(store.name).toBe('');
      expect(store.profession).toBe(ProfessionType.Warrior);
      expect(store.loading).toBe(false);
   });

   it('should return true if the form can be submitted', () => {
      const store = new CharacterCreationStore();

      expect(store.canSubmit).toBe(false);

      store.setName('John');
      store.setLoading(false);

      expect(store.canSubmit).toBe(true);
   });
});
