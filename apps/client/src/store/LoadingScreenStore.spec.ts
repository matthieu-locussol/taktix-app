import { expect, test } from 'vitest';
import { LoadingScreenStore } from './LoadingScreenStore';

test('should have a loadingAssets', () => {
   const store = new LoadingScreenStore();
   expect(store.loadingAssets).toBe(true);
});

test('should have a progress', () => {
   const store = new LoadingScreenStore();
   expect(store.progress).toBe(0);
});

test('should have a currentAssetPath', () => {
   const store = new LoadingScreenStore();
   expect(store.currentAssetPath).toBe(null);
});
