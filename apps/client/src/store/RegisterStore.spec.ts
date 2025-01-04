import { describe, expect, it } from 'vitest';

import { RegisterStore } from './RegisterStore.ts';

describe('RegisterStore', () => {
   it('should be initialized', () => {
      const store = new RegisterStore();

      expect(store).toBeDefined();
      expect(store.email).toBe('');
      expect(store.username).toBe('');
      expect(store.password).toBe('');
      expect(store.errorMessage).toBe('');
      expect(store.loading).toBe(false);
   });

   it('should set the email', () => {
      const store = new RegisterStore();

      store.setEmail('email');
      expect(store.email).toBe('email');
   });

   it('should set the username', () => {
      const store = new RegisterStore();

      store.setUsername('username');
      expect(store.username).toBe('username');
   });

   it('should set the password', () => {
      const store = new RegisterStore();

      store.setPassword('password');
      expect(store.password).toBe('password');
   });

   it('should set the error message', () => {
      const store = new RegisterStore();

      store.setErrorMessage('incorrectCredentials', { username: 'username' });
      expect(store.errorMessage).toBe('incorrectCredentials');
   });

   it('should set the loading', () => {
      const store = new RegisterStore();

      store.setLoading(true);
      expect(store.loading).toBe(true);
   });

   it('should reset the store', () => {
      const store = new RegisterStore();

      store.setEmail('email');
      store.setUsername('username');
      store.setPassword('password');
      store.setErrorMessage('incorrectCredentials', { username: 'username' });
      store.setLoading(true);

      store.reset();

      expect(store.email).toBe('');
      expect(store.username).toBe('');
      expect(store.password).toBe('');
      expect(store.errorMessage).toBe('');
      expect(store.loading).toBe(false);
   });

   it('should return if it can submit', () => {
      const store = new RegisterStore();

      expect(store.canSubmit).toBe(false);

      store.setEmail('email');
      expect(store.canSubmit).toBe(false);

      store.setUsername('username');
      expect(store.canSubmit).toBe(false);

      store.setPassword('password');
      expect(store.canSubmit).toBe(true);

      store.setLoading(true);
      expect(store.canSubmit).toBe(false);
   });
});
