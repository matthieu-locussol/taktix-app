import type { Room } from './types/Room'
import { Direction } from './types/SceneData'
import type { Statistics } from './types/Statistic'

export const MAX_CHARACTERS_PER_ACCOUNT = 3
export const DEFAULT_MAP: Room = 'CloudsRoom'
export const DEFAULT_X = 12
export const DEFAULT_Y = 7
export const DEFAULT_DIRECTION = Direction.DOWN
export const DEFAULT_TALENTS = []
export const DEFAULT_TALENTS_POINTS = 0
export const DEFAULT_BASE_STATISTICS: Partial<Statistics> = {
   'vitality_+f': 0,
   'magicShield_+f': 0,
   'strength_+f': 0,
   'dexterity_+f': 0,
   'intelligence_+f': 0,
   'luck_+f': 0,
}
export const DEFAULT_BASE_STATISTICS_POINTS = 0
export const DEFAULT_EXPERIENCE = 0
