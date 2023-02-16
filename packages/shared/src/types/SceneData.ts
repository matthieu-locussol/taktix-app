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

export interface Position {
   x: number;
   y: number;
}

export interface SceneData {
   entrancePosition?: Position;
   entranceDirection?: Direction;
}
