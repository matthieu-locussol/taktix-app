import { ProfessionType } from '../types/Profession';
import { Statistic } from '../types/Statistic';
import { StatisticMgt } from '../utils/statisticMgt';

export const levelUpStatistics: Record<ProfessionType, Record<Statistic, number>> = {
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
