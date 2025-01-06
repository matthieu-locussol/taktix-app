import type { SvgIconProps } from '@mui/material';
import type { Statistic } from 'shared/src/types/Statistic';

import { StatisticBaseIcon } from './statistics/StatisticBaseIcon';

interface StatisticIconProps extends Omit<SvgIconProps, 'type'> {
   id: Statistic;
}

export const StatisticIcon = ({ id, ...rest }: StatisticIconProps) => {
   const icons: Record<string, React.ReactNode> = {
      'vitality_+f': <StatisticBaseIcon {...rest} color="vitality" path="vitality" type="plus" />,
      'vitality_+%': (
         <StatisticBaseIcon {...rest} color="vitality" path="vitality" type="percent" />
      ),
      'vitality_+x%': <StatisticBaseIcon {...rest} color="vitality" path="vitality" type="more" />,
      'vitality_-f': <StatisticBaseIcon {...rest} color="vitality" path="vitality" />,
      'vitality_-%': <StatisticBaseIcon {...rest} color="vitality" path="vitality" />,
      'vitality_-x%': <StatisticBaseIcon {...rest} color="vitality" path="vitality" />,

      'magicShield_+f': (
         <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" type="plus" />
      ),
      'magicShield_+%': (
         <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" type="percent" />
      ),
      'magicShield_+x%': (
         <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" type="more" />
      ),
      'magicShield_-f': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" />,
      'magicShield_-%': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" />,
      'magicShield_-x%': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" />,

      'strength_+%': (
         <StatisticBaseIcon {...rest} color="strength" path="strength" type="percent" />
      ),
      'strength_+f': <StatisticBaseIcon {...rest} color="strength" path="strength" type="plus" />,
      'strength_+x%': <StatisticBaseIcon {...rest} color="strength" path="strength" type="more" />,
      'strength_-f': <StatisticBaseIcon {...rest} color="strength" path="strength" />,
      'strength_-%': <StatisticBaseIcon {...rest} color="strength" path="strength" />,
      'strength_-x%': <StatisticBaseIcon {...rest} color="strength" path="strength" />,

      'dexterity_+f': (
         <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="plus" />
      ),
      'dexterity_+%': (
         <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="percent" />
      ),
      'dexterity_+x%': (
         <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" type="more" />
      ),
      'dexterity_-f': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" />,
      'dexterity_-%': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" />,
      'dexterity_-x%': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" />,

      'intelligence_+f': (
         <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="plus" />
      ),
      'intelligence_+%': (
         <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="percent" />
      ),
      'intelligence_+x%': (
         <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" type="more" />
      ),
      'intelligence_-f': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" />,
      'intelligence_-%': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" />,
      'intelligence_-x%': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" />,

      'luck_+f': <StatisticBaseIcon {...rest} color="luck" path="luck" type="plus" />,
      'luck_+%': <StatisticBaseIcon {...rest} color="luck" path="luck" type="percent" />,
      'luck_+x%': <StatisticBaseIcon {...rest} color="luck" path="luck" type="more" />,
      'luck_-f': <StatisticBaseIcon {...rest} color="luck" path="luck" />,
      'luck_-%': <StatisticBaseIcon {...rest} color="luck" path="luck" />,
      'luck_-x%': <StatisticBaseIcon {...rest} color="luck" path="luck" />,

      'earthDamages_+f': (
         <StatisticBaseIcon {...rest} color="earthDamages" path="strength" type="plus" />
      ),
      'earthDamages_+%': (
         <StatisticBaseIcon {...rest} color="earthDamages" path="strength" type="percent" />
      ),
      'earthDamages_+x%': (
         <StatisticBaseIcon {...rest} color="earthDamages" path="strength" type="more" />
      ),
      'earthDamages_-f': <StatisticBaseIcon {...rest} color="earthDamages" path="strength" />,
      'earthDamages_-%': <StatisticBaseIcon {...rest} color="earthDamages" path="strength" />,
      'earthDamages_-x%': <StatisticBaseIcon {...rest} color="earthDamages" path="strength" />,

      'windDamages_+f': (
         <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" type="plus" />
      ),
      'windDamages_+%': (
         <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" type="percent" />
      ),
      'windDamages_+x%': (
         <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" type="more" />
      ),
      'windDamages_-f': <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" />,
      'windDamages_-%': <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" />,
      'windDamages_-x%': <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" />,

      'fireDamages_+f': (
         <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" type="plus" />
      ),
      'fireDamages_+%': (
         <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" type="percent" />
      ),
      'fireDamages_+x%': (
         <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" type="more" />
      ),
      'fireDamages_-f': <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" />,
      'fireDamages_-%': <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" />,
      'fireDamages_-x%': <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" />,

      'iceDamages_+f': <StatisticBaseIcon {...rest} color="iceDamages" path="luck" type="plus" />,
      'iceDamages_+%': (
         <StatisticBaseIcon {...rest} color="iceDamages" path="luck" type="percent" />
      ),
      'iceDamages_+x%': <StatisticBaseIcon {...rest} color="iceDamages" path="luck" type="more" />,
      'iceDamages_-f': <StatisticBaseIcon {...rest} color="iceDamages" path="luck" />,
      'iceDamages_-%': <StatisticBaseIcon {...rest} color="iceDamages" path="luck" />,
      'iceDamages_-x%': <StatisticBaseIcon {...rest} color="iceDamages" path="luck" />,

      'sword1HDamages_+f': (
         <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" type="plus" />
      ),
      'sword1HDamages_+%': (
         <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" type="percent" />
      ),
      'sword1HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" type="more" />
      ),
      'sword1HDamages_-f': <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" />,
      'sword1HDamages_-%': <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" />,
      'sword1HDamages_-x%': <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" />,

      'axe1HDamages_+f': (
         <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" type="plus" />
      ),
      'axe1HDamages_+%': (
         <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" type="percent" />
      ),
      'axe1HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" type="more" />
      ),
      'axe1HDamages_-f': <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" />,
      'axe1HDamages_-%': <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" />,
      'axe1HDamages_-x%': <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" />,

      'mace1HDamages_+f': (
         <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" type="plus" />
      ),
      'mace1HDamages_+%': (
         <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" type="percent" />
      ),
      'mace1HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" type="more" />
      ),
      'mace1HDamages_-f': <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" />,
      'mace1HDamages_-%': <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" />,
      'mace1HDamages_-x%': <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" />,

      'daggerDamages_+f': (
         <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" type="plus" />
      ),
      'daggerDamages_+%': (
         <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" type="percent" />
      ),
      'daggerDamages_+x%': (
         <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" type="more" />
      ),
      'daggerDamages_-f': <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" />,
      'daggerDamages_-%': <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" />,
      'daggerDamages_-x%': <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" />,

      'wandDamages_+f': <StatisticBaseIcon {...rest} color="wandDamages" path="wand" type="plus" />,
      'wandDamages_+%': (
         <StatisticBaseIcon {...rest} color="wandDamages" path="wand" type="percent" />
      ),
      'wandDamages_+x%': (
         <StatisticBaseIcon {...rest} color="wandDamages" path="wand" type="more" />
      ),
      'wandDamages_-f': <StatisticBaseIcon {...rest} color="wandDamages" path="wand" />,
      'wandDamages_-%': <StatisticBaseIcon {...rest} color="wandDamages" path="wand" />,
      'wandDamages_-x%': <StatisticBaseIcon {...rest} color="wandDamages" path="wand" />,

      'sword2HDamages_+f': (
         <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" type="plus" />
      ),
      'sword2HDamages_+%': (
         <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" type="percent" />
      ),
      'sword2HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" type="more" />
      ),
      'sword2HDamages_-f': <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" />,
      'sword2HDamages_-%': <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" />,
      'sword2HDamages_-x%': <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" />,

      'axe2HDamages_+f': (
         <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" type="plus" />
      ),
      'axe2HDamages_+%': (
         <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" type="percent" />
      ),
      'axe2HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" type="more" />
      ),
      'axe2HDamages_-f': <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" />,
      'axe2HDamages_-%': <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" />,
      'axe2HDamages_-x%': <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" />,

      'mace2HDamages_+f': (
         <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" type="plus" />
      ),
      'mace2HDamages_+%': (
         <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" type="percent" />
      ),
      'mace2HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" type="more" />
      ),
      'mace2HDamages_-f': <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" />,
      'mace2HDamages_-%': <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" />,
      'mace2HDamages_-x%': <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" />,

      'bowDamages_+f': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" type="plus" />,
      'bowDamages_+%': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" type="percent" />,
      'bowDamages_+x%': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" type="more" />,
      'bowDamages_-f': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" />,
      'bowDamages_-%': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" />,
      'bowDamages_-x%': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" />,

      'staffDamages_+f': (
         <StatisticBaseIcon {...rest} color="staffDamages" path="staff" type="plus" />
      ),
      'staffDamages_+%': (
         <StatisticBaseIcon {...rest} color="staffDamages" path="staff" type="percent" />
      ),
      'staffDamages_+x%': (
         <StatisticBaseIcon {...rest} color="staffDamages" path="staff" type="more" />
      ),
      'staffDamages_-f': <StatisticBaseIcon {...rest} color="staffDamages" path="staff" />,
      'staffDamages_-%': <StatisticBaseIcon {...rest} color="staffDamages" path="staff" />,
      'staffDamages_-x%': <StatisticBaseIcon {...rest} color="staffDamages" path="staff" />,

      'earthResistance_+f': (
         <StatisticBaseIcon {...rest} color="earthResistance" path="strength" type="resistances" />
      ),
      'earthResistance_+%': (
         <StatisticBaseIcon {...rest} color="earthResistance" path="strength" type="resistances" />
      ),
      'windResistance_+f': (
         <StatisticBaseIcon {...rest} color="windResistance" path="dexterity" type="resistances" />
      ),
      'windResistance_+%': (
         <StatisticBaseIcon {...rest} color="windResistance" path="dexterity" type="resistances" />
      ),
      'fireResistance_+f': (
         <StatisticBaseIcon
            {...rest}
            color="fireResistance"
            path="intelligence"
            type="resistances"
         />
      ),
      'fireResistance_+%': (
         <StatisticBaseIcon
            {...rest}
            color="fireResistance"
            path="intelligence"
            type="resistances"
         />
      ),
      'iceResistance_+f': (
         <StatisticBaseIcon {...rest} color="iceResistance" path="luck" type="resistances" />
      ),
      'iceResistance_+%': (
         <StatisticBaseIcon {...rest} color="iceResistance" path="luck" type="resistances" />
      ),

      'initiative_+f': (
         <StatisticBaseIcon {...rest} color="initiative" path="initiative" type="plus" />
      ),
      'precision_+f': (
         <StatisticBaseIcon {...rest} color="precision" path="precision" type="plus" />
      ),
      'precision_+%': (
         <StatisticBaseIcon {...rest} color="precision" path="precision" type="percent" />
      ),
      'evasion_+f': <StatisticBaseIcon {...rest} color="evasion" path="evasion" type="plus" />,
      'evasion_+%': <StatisticBaseIcon {...rest} color="evasion" path="evasion" type="percent" />,

      'lifeSteal_+f': (
         <StatisticBaseIcon {...rest} color="lifeSteal" path="lifeSteal" type="plus" />
      ),
      'lifeSteal_+%': (
         <StatisticBaseIcon {...rest} color="lifeSteal" path="lifeSteal" type="percent" />
      ),

      'criticalStrikeChance_+f': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeChance"
            path="criticalStrike"
            type="plus"
         />
      ),
      'criticalStrikeChance_+%': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeChance"
            path="criticalStrike"
            type="percent"
         />
      ),
      'criticalStrikeDamages_+%': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeDamages"
            path="criticalStrike"
            type="damages"
         />
      ),
      'criticalStrikeResistance_+f': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeResistance"
            path="criticalStrikeResistance"
            type="plus"
         />
      ),
      'criticalStrikeResistance_+%': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeResistance"
            path="criticalStrikeResistance"
            type="percent"
         />
      ),

      'areaOfEffect_+%': (
         <StatisticBaseIcon {...rest} color="areaOfEffect" path="areaOfEffect" type="percent" />
      ),

      'thornsPhysical_+%': (
         <StatisticBaseIcon {...rest} color="thornsPhysical" path="thornsPhysical" type="percent" />
      ),
      'thornsMagical_+%': (
         <StatisticBaseIcon {...rest} color="thornsMagical" path="thornsMagical" type="percent" />
      ),
      'prospect_+f': <StatisticBaseIcon {...rest} color="prospect" path="prospect" type="plus" />,
      'elementalDamages_+f': (
         <StatisticBaseIcon
            {...rest}
            color="elementalDamages"
            path="elementalDamages"
            type="plus"
         />
      ),
      'elementalResistances_+f': (
         <StatisticBaseIcon
            {...rest}
            color="elementalResistances"
            path="elementalResistances"
            type="resistances"
         />
      ),
   } satisfies Partial<Record<Statistic, React.ReactNode>>;

   return icons[id] || null;
};
