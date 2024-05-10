import { z } from 'zod';

export enum ProfessionType {
   Warrior = 'Warrior',
   Mage = 'Mage',
   Archer = 'Archer',
}

export const zProfessionType = z.nativeEnum(ProfessionType);

export const isProfessionType = (value: unknown): value is ProfessionType =>
   zProfessionType.safeParse(value).success;

export const professions = Object.values(ProfessionType);

export const CharacterSpritesheet: Record<ProfessionType, number> = {
   [ProfessionType.Warrior]: 0,
   [ProfessionType.Mage]: 3,
   [ProfessionType.Archer]: 7,
};
