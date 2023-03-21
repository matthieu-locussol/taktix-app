import { expect, it } from 'vitest';
import { LoadingScreenStore } from './LoadingScreenStore';

it('should have a loadingAssets', () => {
   const store = new LoadingScreenStore();
   expect(store.loadingAssets).toBe(true);
});

it('should have a progress', () => {
   const store = new LoadingScreenStore();
   expect(store.progress).toBe(0);
});

it('should have a currentAssetPath', () => {
   const store = new LoadingScreenStore();
   expect(store.currentAssetPath).toBe(null);
});

it('should set progress', () => {
   const store = new LoadingScreenStore();
   store.setProgress(0.45);
   expect(store.progress).toBe(45);
});
