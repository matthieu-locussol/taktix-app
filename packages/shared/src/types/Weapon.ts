import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

export const weapons = [
   'sword1H',
   'axe1H',
   'mace1H',
   'dagger',
   'wand',
   'sword2H',
   'axe2H',
   'mace2H',
   'bow',
   'staff',
] as const;

export const zWeaponType = ZodMgt.constructZodLiteralUnionType(
   weapons.map((type) => z.literal(type)),
);

export type WeaponType = z.infer<typeof zWeaponType>;

export const isWeaponType = (value: unknown): value is WeaponType =>
   zWeaponType.safeParse(value).success;

export const weaponDamagesTypes = ['strength', 'dexterity', 'intelligence', 'luck'] as const;

export const zWeaponDamagesType = ZodMgt.constructZodLiteralUnionType(
   weaponDamagesTypes.map((damage) => z.literal(damage)),
);

export type WeaponDamagesType = z.infer<typeof zWeaponDamagesType>;

export const zWeaponDamages = z.object({
   type: zWeaponDamagesType,
   min: z.number(),
   max: z.number(),
});

export type WeaponDamages = z.infer<typeof zWeaponDamages>;
