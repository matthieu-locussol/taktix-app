import { describe, expect, it } from 'vitest';
import { LoginStore } from './LoginStore';

describe('LoginStore', () => {
   it('should be initialized', () => {
      const store = new LoginStore();

      expect(store).toBeDefined();
      expect(store.username).toBe('');
      expect(store.password).toBe('');
      expect(store.errorMessage).toBe('');
      expect(store.successMessage).toBe('');
      expect(store.loading).toBe(false);
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
      store.setErrorMessage('error');
      expect(store.errorMessage).toBe('error');
   });

   it('should set the success message', () => {
      const store = new LoginStore();
      store.setSuccessMessage('success');
      expect(store.successMessage).toBe('success');
   });

   it('should set the loading', () => {
      const store = new LoginStore();
      store.setLoading(true);
      expect(store.loading).toBe(true);
   });

   it('should reset the store', () => {
      const store = new LoginStore();

      store.setUsername('username');
      store.setPassword('password');
      store.setErrorMessage('error');
      store.setSuccessMessage('success');
      store.setLoading(true);

      store.reset();

      expect(store.username).toBe('');
      expect(store.password).toBe('');
      expect(store.errorMessage).toBe('');
      expect(store.successMessage).toBe('');
      expect(store.loading).toBe(false);
   });

   it('should return true if can submit', () => {
      const store = new LoginStore();

      store.setUsername('username');
      store.setPassword('password');
      store.setLoading(false);

      expect(store.canSubmit).toBe(true);
   });
});
