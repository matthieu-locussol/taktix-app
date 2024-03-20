import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

export enum WeaponType {
   Sword1H = 'sword1H',
   Axe1H = 'axe1H',
   Mace1H = 'mace1H',
   Dagger = 'dagger',
   Wand = 'wand',
   Sword2H = 'sword2H',
   Axe2H = 'axe2H',
   Mace2H = 'mace2H',
   Bow = 'bow',
   Staff = 'staff',
}

export const zWeaponType = z.nativeEnum(WeaponType);

export const isWeaponType = (value: unknown): value is WeaponType =>
   zWeaponType.safeParse(value).success;

export const weapons = Object.values(WeaponType);

export const weaponDamagesTypes = ['strength', 'dexterity', 'intelligence', 'luck'] as const;

export const zWeaponDamagesType = ZodMgt.constructZodLiteralUnionType(
   weaponDamagesTypes.map((damage) => z.literal(damage)),
);

export const zWeaponDamages = z.object({
   type: zWeaponDamagesType,
   min: z.number(),
   max: z.number(),
});

export type WeaponDamages = z.infer<typeof zWeaponDamages>;
