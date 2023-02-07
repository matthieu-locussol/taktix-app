import { makeAutoObservable } from 'mobx';

export class LoadingScreenStore {
   public firstLoading: boolean = true;

   public loadingAssets: boolean = true;

   public progress: number = 0;

   public currentAssetPath: string | null = null;

   constructor() {
      makeAutoObservable(this);
   }

   public setLoadingAssets(loadingAssets: boolean) {
      this.loadingAssets = loadingAssets;
   }

   public setProgress(progress: number) {
      this.progress = progress * 100;
   }

   public setCurrentAssetPath(currentAssetPath: string | null) {
      this.currentAssetPath = currentAssetPath;
   }

   public setFirstLoading(firstLoading: boolean) {
      this.firstLoading = firstLoading;
   }
}
