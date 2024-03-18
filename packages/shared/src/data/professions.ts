import { ProfessionType } from '../types/Profession';
import { Statistics } from '../types/Statistic';
import { StatisticMgt } from '../utils/statisticMgt';

export const levelUpStatistics: Record<ProfessionType, Statistics> = {
   [ProfessionType.Warrior]: StatisticMgt.makeMockedStatistics({
      'vitality_+f': 12,
      'precision_+f': 2,
   }),
   [ProfessionType.Mage]: StatisticMgt.makeMockedStatistics({
      'vitality_+f': 12,
      'precision_+f': 2,
   }),
   [ProfessionType.Archer]: StatisticMgt.makeMockedStatistics({
      'vitality_+f': 12,
      'precision_+f': 2,
   }),
};
