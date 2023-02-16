import { Direction, Position } from 'grid-engine';
import { z } from 'zod';

export const zPlayer = z.object({
   nickname: z.string(),
   x: z.number(),
   y: z.number(),
});

export type Player = z.infer<typeof zPlayer>;

export interface SceneData {
   entrancePosition?: Position;
   entranceDirection?: Direction;
}
