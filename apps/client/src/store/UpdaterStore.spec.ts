import { expect, it } from 'vitest';
import { UpdaterStore } from './UpdaterStore';

it('should have an initial state', () => {
   const store = new UpdaterStore();

   expect(store.shouldUpdate).toEqual(undefined);
   expect(store.updateManifest).toEqual(undefined);
   expect(store.updating).toEqual(false);
   expect(store.openUpdateModal).toEqual(false);
   expect(store.errorMessage).toEqual('');
});
