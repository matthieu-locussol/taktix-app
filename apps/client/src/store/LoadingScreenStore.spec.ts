import { describe, expect, it } from 'vitest';

import { LoadingScreenStore } from './LoadingScreenStore';

describe('LoadingScreenStore', () => {
   it('should be initialized', () => {
      const store = new LoadingScreenStore();

      expect(store).toBeDefined();
      expect(store.loadingAssets).toBe(true);
      expect(store.progress).toBe(0);
      expect(store.currentAssetPath).toBe(null);
   });

   it('should set loadingAssets', () => {
      const store = new LoadingScreenStore();

      store.setLoadingAssets(false);
      expect(store.loadingAssets).toBe(false);
   });

   it('should set progress', () => {
      const store = new LoadingScreenStore();

      store.setProgress(0.45);
      expect(store.progress).toBe(45);
   });

   it('should set currentAssetPath', () => {
      const store = new LoadingScreenStore();

      store.setCurrentAssetPath('path');
      expect(store.currentAssetPath).toBe('path');
   });
});
