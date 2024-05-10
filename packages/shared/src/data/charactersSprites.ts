import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

export const charactersSpritesNames = [
   'Character_001',
   'Character_002',
   'Character_003',
   'Character_004',
   'Character_005',
   'Character_006',
   'Character_007',
   'Character_008',
   'Character_009',
   'Character_010',
   'Character_011',
   'Character_012',
   'Character_013',
   'Character_014',
   'Character_015',
   'Character_016',
   'Character_017',
   'Character_018',
   'Character_019',
   'Character_020',
   'Character_021',
   'Character_022',
   'Character_023',
   'Character_024',
   'Character_025',
   'Character_026',
   'Character_027',
   'Character_028',
   'Character_029',
   'Character_030',
   'Character_031',
   'Character_032',
   'Character_033',
   'Character_034',
   'Character_035',
   'Character_036',
   'Character_037',
   'Character_038',
   'Character_039',
   'Character_040',
   'Character_041',
   'Character_042',
   'Character_043',
   'Character_044',
   'Character_045',
   'Character_046',
   'Character_047',
   'Character_048',
   'Character_049',
   'Character_050',
   'Character_051',
   'Character_052',
   'Character_053',
   'Character_054',
   'Character_055',
   'Character_056',
   'Character_057',
   'Character_058',
   'Character_059',
   'Character_060',
   'Character_061',
   'Character_062',
   'Character_063',
   'Character_064',
   'Character_065',
   'Character_066',
   'Character_067',
   'Character_068',
   'Character_069',
   'Character_070',
   'Character_071',
   'Character_072',
   'Character_073',
   'Character_074',
   'Character_075',
   'Character_076',
   'Character_077',
   'Character_078',
   'Character_079',
   'Character_080',
] as const;

const zCharacterSpriteName = ZodMgt.constructZodLiteralUnionType(
   charactersSpritesNames.map((name) => z.literal(name)),
);

export type CharacterSpriteName = z.infer<typeof zCharacterSpriteName>;

export const zCharacterSprite = z.object({
   frameWidth: z.number(),
   frameHeight: z.number(),
});

export type CharacterSprite = z.infer<typeof zCharacterSprite>;

export const charactersSprites: Record<CharacterSpriteName, CharacterSprite> = {
   Character_001: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_002: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_003: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_004: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_005: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_006: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_007: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_008: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_009: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_010: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_011: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_012: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_013: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_014: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_015: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_016: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_017: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_018: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_019: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_020: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_021: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_022: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_023: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_024: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_025: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_026: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_027: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_028: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_029: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_030: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_031: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_032: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_033: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_034: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_035: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_036: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_037: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_038: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_039: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_040: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_041: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_042: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_043: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_044: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_045: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_046: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_047: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_048: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_049: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_050: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_051: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_052: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_053: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_054: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_055: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_056: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_057: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_058: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_059: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_060: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_061: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_062: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_063: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_064: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_065: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_066: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_067: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_068: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_069: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_070: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_071: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_072: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_073: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_074: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_075: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_076: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_077: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_078: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_079: {
      frameWidth: 24,
      frameHeight: 24,
   },
   Character_080: {
      frameWidth: 24,
      frameHeight: 24,
   },
};
