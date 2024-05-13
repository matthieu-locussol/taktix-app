import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

export const monstersSprites = [
   'Enemy_001',
   'Enemy_002',
   'Enemy_003',
   'Enemy_004',
   'Enemy_005',
   'Enemy_006',
   'Enemy_007',
   'Enemy_008',
   'Enemy_009',
   'Enemy_010',
   'Enemy_011',
   'Enemy_012',
   'Enemy_013',
   'Enemy_014',
   'Enemy_015',
   'Enemy_016',
   'Enemy_017',
   'Enemy_018',
   'Enemy_019',
   'Enemy_020',
   'Enemy_021',
   'Enemy_022',
   'Enemy_023',
   'Enemy_024',
   'Enemy_025',
   'Enemy_026',
   'Enemy_027',
   'Enemy_028',
   'Enemy_029',
   'Enemy_030',
   'Enemy_031',
   'Enemy_032',
   'Enemy_033',
   'Enemy_034',
   'Enemy_035',
   'Enemy_036',
   'Enemy_037',
   'Enemy_038',
   'Enemy_039',
   'Enemy_040',
   'Enemy_041',
   'Enemy_042',
   'Enemy_043',
   'Enemy_044',
   'Enemy_045',
   'Enemy_046',
   'Enemy_047',
   'Enemy_048',
   'Enemy_049',
   'Enemy_050',
   'Enemy_051',
   'Enemy_052',
   'Enemy_053',
   'Enemy_Big_13',
   'Enemy_Big_14',
   'Enemy_Big_15',
   'Enemy_Big_16',
   'Enemy_Big_17',
   'Enemy_Big_18',
   'Enemy_Big_19',
   'Enemy_Big_20',
   'Enemy_Big_21',
   'Enemy_Big_22',
   'Enemy_Big_23',
   'Enemy_Big_24',
   'Boss_001',
   'Boss_002',
   'Boss_003',
   'Boss_004',
   'Boss_005',
   'Boss_006',
   'Boss_007',
   'Boss_008',
   'Boss_009',
   'Boss_010',
   'Boss_011',
   'Boss_012',
   'Boss_013',
   'Boss_014',
   'Boss_015',
   'Boss_016',
   'Boss_017',
   'Boss_018',
   'Boss_019',
   'Boss_020',
   'Boss_021',
   'Boss_022',
   'Boss_023',
   'Boss_024',
   'Boss_025',
   'Boss_026',
   'Boss_027',
   'Boss_028',
   'Boss_029',
   'Boss_030',
   'Boss_031',
   'Boss_032',
   'Boss_033',
   'Boss_034',
   'Boss_035',
   'Boss_036',
   'Boss_037',
   'Boss_038',
   'Boss_039',
   'Boss_040',
   'Boss_041',
   'Boss_042',
   'Boss_043',
   'Boss_044',
] as const;

export const zMonsterSprite = ZodMgt.constructZodLiteralUnionType(
   monstersSprites.map((name) => z.literal(name)),
);

export type MonsterSprite = z.infer<typeof zMonsterSprite>;

export const isMonsterSprite = (value: unknown): value is MonsterSprite =>
   zMonsterSprite.safeParse(value).success;

interface MonsterSpriteData {
   frameWidth: number;
   frameHeight: number;
   frames: number[];
   scale: number;
}

export const monstersSpritesData: Record<MonsterSprite, MonsterSpriteData> = {
   Enemy_001: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_002: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_003: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_004: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_005: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_006: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_007: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_008: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_009: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_010: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_011: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_012: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_013: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_014: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_015: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_016: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_017: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_018: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_019: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_020: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_021: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_022: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_023: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_024: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_025: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_026: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_027: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_028: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_029: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_030: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_031: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_032: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_033: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_034: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_035: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_036: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_037: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_038: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_039: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_040: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_041: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_042: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_043: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_044: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_045: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_046: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_047: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_048: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_049: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_050: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_051: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_052: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_053: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [4, 5, 6, 7],
      scale: 1.375,
   },
   Enemy_Big_13: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_14: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_15: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_16: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_17: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_18: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_19: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_20: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_21: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_22: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_23: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Enemy_Big_24: {
      frameWidth: 24,
      frameHeight: 24,
      frames: [3, 4, 5],
      scale: 1.375,
   },
   Boss_001: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_002: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_003: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_004: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_005: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_006: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_007: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_008: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_009: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_010: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_011: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_012: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_013: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_014: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_015: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_016: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_017: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_018: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_019: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_020: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_021: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_022: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_023: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_024: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_025: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_026: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_027: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_028: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_029: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_030: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_031: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_032: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_033: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_034: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_035: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_036: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_037: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_038: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_039: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_040: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_041: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_042: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_043: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
   Boss_044: {
      frameWidth: 48,
      frameHeight: 48,
      frames: [4, 5, 6, 7],
      scale: 0.675,
   },
};
