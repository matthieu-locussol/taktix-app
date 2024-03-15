import DexterityIcon from '@mui/icons-material/AirRounded';
import VitalityIcon from '@mui/icons-material/FavoriteRounded';
import IntelligenceIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import MagicShieldIcon from '@mui/icons-material/ShieldMoonRounded';
import StrengthIcon from '@mui/icons-material/VolcanoRounded';
import LuckIcon from '@mui/icons-material/WaterDropRounded';
import { SvgIconProps } from '@mui/material';
import { Statistic } from 'shared/src/types/Statistic';

interface StatisticIconProps extends SvgIconProps {
   id: Statistic;
}

export const StatisticIcon = ({ id, ...rest }: StatisticIconProps) => {
   const icons: Record<string, React.ReactNode> = {
      'vitality_+f': <VitalityIcon {...rest} />,
      'vitality_+%': <VitalityIcon {...rest} />,
      'vitality_+x%': <VitalityIcon {...rest} />,
      'vitality_-f': <VitalityIcon {...rest} />,
      'vitality_-%': <VitalityIcon {...rest} />,
      'vitality_-x%': <VitalityIcon {...rest} />,

      'magicShield_+f': <MagicShieldIcon {...rest} />,
      'magicShield_+%': <MagicShieldIcon {...rest} />,
      'magicShield_+x%': <MagicShieldIcon {...rest} />,
      'magicShield_-f': <MagicShieldIcon {...rest} />,
      'magicShield_-%': <MagicShieldIcon {...rest} />,
      'magicShield_-x%': <MagicShieldIcon {...rest} />,

      'strength_+f': <StrengthIcon {...rest} />,
      'strength_+%': <StrengthIcon {...rest} />,
      'strength_+x%': <StrengthIcon {...rest} />,
      'strength_-f': <StrengthIcon {...rest} />,
      'strength_-%': <StrengthIcon {...rest} />,
      'strength_-x%': <StrengthIcon {...rest} />,

      'dexterity_+f': <DexterityIcon {...rest} />,
      'dexterity_+%': <DexterityIcon {...rest} />,
      'dexterity_+x%': <DexterityIcon {...rest} />,
      'dexterity_-f': <DexterityIcon {...rest} />,
      'dexterity_-%': <DexterityIcon {...rest} />,
      'dexterity_-x%': <DexterityIcon {...rest} />,

      'intelligence_+f': <IntelligenceIcon {...rest} />,
      'intelligence_+%': <IntelligenceIcon {...rest} />,
      'intelligence_+x%': <IntelligenceIcon {...rest} />,
      'intelligence_-f': <IntelligenceIcon {...rest} />,
      'intelligence_-%': <IntelligenceIcon {...rest} />,
      'intelligence_-x%': <IntelligenceIcon {...rest} />,

      'luck_+f': <LuckIcon {...rest} />,
      'luck_+%': <LuckIcon {...rest} />,
      'luck_+x%': <LuckIcon {...rest} />,
      'luck_-f': <LuckIcon {...rest} />,
      'luck_-%': <LuckIcon {...rest} />,
      'luck_-x%': <LuckIcon {...rest} />,
   } satisfies Partial<Record<Statistic, React.ReactNode>>;

   return icons[id] || null;
};
