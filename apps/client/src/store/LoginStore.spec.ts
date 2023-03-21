import { expect, it } from 'vitest';
import { LoginStore } from './LoginStore';

it('should have an input', () => {
   const store = new LoginStore();
   expect(store.input).toBe('');
});

it('should have an error message', () => {
   const store = new LoginStore();
   expect(store.errorMessage).toBe('');
});
