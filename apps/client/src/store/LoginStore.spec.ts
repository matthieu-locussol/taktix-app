import { afterEach, describe, expect, it, vi } from 'vitest';

import { LoginStore } from './LoginStore';

describe('LoginStore', () => {
   const getItemSpy = vi.spyOn(localStorage, 'getItem');

   afterEach(() => {
      getItemSpy.mockClear();
      localStorage.clear();
   });

   it('should be initialized', () => {
      const store = new LoginStore();

      expect(store).toBeDefined();
      expect(store.username).toBe('');
      expect(store.password).toBe('');
      expect(store.errorMessage).toBe('');
      expect(store.successMessage).toBe('');
      expect(store.loading).toBe(false);
      expect(store.memorizeCredentials).toBe(false);
      expect(store.openMemorizeCredentials).toBe(false);
   });

   it('should set the username', () => {
      const store = new LoginStore();

      store.setUsername('username');
      expect(store.username).toBe('username');
   });

   it('should set the password', () => {
      const store = new LoginStore();

      store.setPassword('password');
      expect(store.password).toBe('password');
   });

   it('should set the error message', () => {
      const store = new LoginStore();

      store.setErrorMessage('incorrectCredentials', { username: 'username' });
      expect(store.errorMessage).toBe('incorrectCredentials');
   });

   it('should set the success message', () => {
      const store = new LoginStore();

      store.setSuccessMessage('accountCreated');
      expect(store.successMessage).toBe('accountCreated');
   });

   it('should set the loading', () => {
      const store = new LoginStore();

      store.setLoading(true);
      expect(store.loading).toBe(true);
   });

   it('should set the memorize credentials', () => {
      const store = new LoginStore();

      store.setMemorizeCredentials(true);
      expect(store.memorizeCredentials).toBe(true);
   });

   it('should set the open memorize credentials', () => {
      const store = new LoginStore();

      store.setOpenMemorizeCredentials(true);
      expect(store.openMemorizeCredentials).toBe(true);
   });

   it('should save the credentials', () => {
      const store = new LoginStore();

      expect(localStorage.getItem('saveCredentials')).toBe(null);

      store.setOpenMemorizeCredentials(true);
      store.saveCredentials();

      expect(store.openMemorizeCredentials).toBe(false);
      expect(localStorage.getItem('saveCredentials')).toBe('true');
   });

   it('should cancel the save of credentials', () => {
      const store = new LoginStore();

      store.setMemorizeCredentials(true);
      store.setOpenMemorizeCredentials(true);

      store.cancelSaveCredentials();

      expect(store.memorizeCredentials).toBe(false);
      expect(store.openMemorizeCredentials).toBe(false);
      expect(localStorage.getItem('saveCredentials')).toBe(null);
   });

   it('should reset the store', () => {
      const store = new LoginStore();

      store.setUsername('username');
      store.setPassword('password');
      store.setErrorMessage('incorrectCredentials', { username: 'username' });
      store.setSuccessMessage('accountCreated');
      store.setLoading(true);
      store.setMemorizeCredentials(true);
      store.setOpenMemorizeCredentials(true);

      store.reset();

      expect(store.username).toBe('');
      expect(store.password).toBe('');
      expect(store.errorMessage).toBe('');
      expect(store.successMessage).toBe('');
      expect(store.loading).toBe(false);
      expect(store.memorizeCredentials).toBe(true);
      expect(store.openMemorizeCredentials).toBe(true);
   });

   it('should return true if can submit', () => {
      const store = new LoginStore();

      store.setUsername('username');
      store.setPassword('password');
      store.setLoading(false);

      expect(store.canSubmit).toBe(true);
   });
});
