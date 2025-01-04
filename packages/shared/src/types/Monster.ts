import { z } from 'zod';

import { ZodMgt } from '../utils/zodMgt.ts';

export const monstersTypes = ['common', 'magic', 'rare', 'boss'] as const;

export const zMonsterType = ZodMgt.constructZodLiteralUnionType(
   monstersTypes.map((type) => z.literal(type)),
);

export type MonsterType = z.infer<typeof zMonsterType>;

export const isMonsterType = (value: unknown): value is MonsterType =>
   monstersTypes.includes(value as MonsterType);
