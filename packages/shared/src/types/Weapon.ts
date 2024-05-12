import { z } from 'zod';
import { ZodMgt } from '../utils/zodMgt';

export const weapons1H = ['sword1H', 'axe1H', 'mace1H', 'dagger', 'wand'] as const;

const zWeapon1HType = ZodMgt.constructZodLiteralUnionType(weapons1H.map((type) => z.literal(type)));

export type Weapon1HType = z.infer<typeof zWeapon1HType>;

export const isWeapon1HType = (value: unknown): value is Weapon1HType =>
   zWeapon1HType.safeParse(value).success;

export const weapons2H = ['sword2H', 'axe2H', 'mace2H', 'bow', 'staff'] as const;

const zWeapon2HType = ZodMgt.constructZodLiteralUnionType(weapons2H.map((type) => z.literal(type)));

export type Weapon2HType = z.infer<typeof zWeapon2HType>;

export const isWeapon2HType = (value: unknown): value is Weapon2HType =>
   zWeapon2HType.safeParse(value).success;

export const weapons = [...weapons1H, ...weapons2H] as const;

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
   weaponType: zWeaponType,
   type: zWeaponDamagesType,
   min: z.number(),
   max: z.number(),
});

export type WeaponDamages = z.infer<typeof zWeaponDamages>;
