import type { Room } from './types/Room';
import { Direction } from './types/SceneData';
import type { Statistics } from './types/Statistic';

export const MAX_CHARACTERS_PER_ACCOUNT = 3;
export const DEFAULT_MAP: Room = 'MoonshadowHotelRoom';
export const DEFAULT_X = 19;
export const DEFAULT_Y = 16;
export const DEFAULT_DIRECTION = Direction.DOWN;
export const DEFAULT_TALENTS = [];
export const DEFAULT_TALENTS_POINTS = 0;
export const DEFAULT_BASE_STATISTICS: Partial<Statistics> = {
   'vitality_+f': 0,
   'magicShield_+f': 0,
   'strength_+f': 0,
   'dexterity_+f': 0,
   'intelligence_+f': 0,
   'luck_+f': 0,
};
export const DEFAULT_BASE_STATISTICS_POINTS = 0;
export const DEFAULT_EXPERIENCE = 0;
export const DEFAULT_HEALTH = 50;
export const DEFAULT_HEALTH_REGEN_MS = 1000;
export const DEFAULT_TELEPORTERS: Room[] = [];
export const DEFAULT_MONEY = 0;
export const DEFAULT_GACHIX = 0;

export const STATISTICS_POINTS_PER_LEVEL = 5;
export const TALENTS_POINTS_PER_LEVEL = 1;

export const MINIMUM_TURN_TIME = 1000;

export const TILE_SIZE = 16;

export const INTERACTION_DRINK_WINE_COST = 20;
