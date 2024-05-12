import { Animation, AnimationData, AnimationFile, AnimationFileData } from '../types/Animation';
import { WeaponType } from '../types/Weapon';

export const weaponsAnimations: Record<WeaponType, Animation> = {
   axe1H: Animation.Explosion,
   axe2H: Animation.Explosion,
   bow: Animation.Explosion,
   dagger: Animation.Explosion,
   staff: Animation.Explosion,
   sword1H: Animation.Explosion,
   sword2H: Animation.Explosion,
   mace1H: Animation.Explosion,
   mace2H: Animation.Explosion,
   wand: Animation.Explosion,
};

export const animationFilesData: Record<AnimationFile, AnimationFileData> = {
   [AnimationFile.Hits]: {
      id: AnimationFile.Hits,
      path: `assets/animations/${AnimationFile.Hits}.png`,
      frameWidth: 64,
      frameHeight: 64,
      framesPerRow: 11,
   },
   [AnimationFile.Hits2]: {
      id: AnimationFile.Hits2,
      path: `assets/animations/${AnimationFile.Hits2}.png`,
      frameWidth: 64,
      frameHeight: 64,
      framesPerRow: 16,
   },
};

export const animationsData: Record<Animation, AnimationData> = {
   explosion: {
      id: Animation.Explosion,
      offset: 7,
      frameRate: 24,
      scale: 2,
   },
   smallExplosion: {
      id: Animation.SmallExplosion,
      offset: 11,
      frameRate: 24,
      scale: 3,
   },
   flower: {
      id: Animation.Flower,
      offset: 8,
      frameRate: 24,
      scale: 2,
   },
};
