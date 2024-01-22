import { describe, expect, it } from 'vitest';
import { CharacterCreationStore } from './CharacterCreationStore';

describe('CharacterCreationStore', () => {
   it('should be initialized', () => {
      const store = new CharacterCreationStore();

      expect(store).toBeDefined();
      expect(store.errorMessage).toEqual('');
      expect(store.successMessage).toEqual('');
      expect(store.name).toEqual('');
      expect(store.loading).toEqual(false);
   });

   it('should set the name', () => {
      const store = new CharacterCreationStore();
      store.setName('John');
      expect(store.name).toBe('John');
   });

   it('should set the loading', () => {
      const store = new CharacterCreationStore();
      store.setLoading(true);
      expect(store.loading).toBe(true);
   });

   it('should set the error message', () => {
      const store = new CharacterCreationStore();
      store.setErrorMessage('error');
      expect(store.errorMessage).toBe('error');
   });

   it('should set the success message', () => {
      const store = new CharacterCreationStore();
      store.setSuccessMessage('success');
      expect(store.successMessage).toBe('success');
   });

   it('should reset the store', () => {
      const store = new CharacterCreationStore();

      store.setErrorMessage('error');
      store.setSuccessMessage('success');
      store.setName('John');
      store.setLoading(true);

      store.reset();

      expect(store.errorMessage).toBe('');
      expect(store.successMessage).toBe('');
      expect(store.name).toBe('');
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
