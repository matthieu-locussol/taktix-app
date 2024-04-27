import { z } from 'zod';

export enum AnimationFile {
   Hits = 'hits',
   Hits2 = 'hits2',
}

export const zAnimationFile = z.nativeEnum(AnimationFile);

export const isAnimationFile = (value: unknown): value is AnimationFile =>
   zAnimationFile.safeParse(value).success;

export const animationsFiles = Object.values(AnimationFile);

export enum Animation {
   Explosion = 'explosion',
   SmallExplosion = 'smallExplosion',
   Flower = 'flower',
}

export const zAnimation = z.nativeEnum(Animation);

export const isAnimation = (value: unknown): value is Animation =>
   zAnimation.safeParse(value).success;

export const animations = Object.values(Animation);

export const ANIMATION_TO_FILE: Record<Animation, AnimationFile> = {
   [Animation.Explosion]: AnimationFile.Hits,
   [Animation.SmallExplosion]: AnimationFile.Hits,
   [Animation.Flower]: AnimationFile.Hits2,
};

export interface AnimationFileData {
   id: AnimationFile;
   path: string;
   frameWidth: number;
   frameHeight: number;
   framesPerRow: number;
}

export interface AnimationData {
   id: Animation;
   offset: number;
   frameRate: number;
   scale: number;
}
