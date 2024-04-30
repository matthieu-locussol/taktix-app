import { z } from 'zod';

export enum Direction {
   NONE = 'none',
   LEFT = 'left',
   UP_LEFT = 'up-left',
   UP = 'up',
   UP_RIGHT = 'up-right',
   RIGHT = 'right',
   DOWN_RIGHT = 'down-right',
   DOWN = 'down',
   DOWN_LEFT = 'down-left',
}

export const zDirection = z.nativeEnum(Direction);

export const isDirection = (value: unknown): value is Direction =>
   zDirection.safeParse(value).success;

export interface Position {
   x: number;
   y: number;
}

export interface SceneData {
   entrancePosition?: Position;
   entranceDirection?: Direction;
}
