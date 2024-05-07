import { SvgIconProps } from '@mui/material';
import { Statistic } from 'shared/src/types/Statistic';
import { StatisticBaseIcon } from './statistics/StatisticBaseIcon';

interface StatisticIconProps extends Omit<SvgIconProps, 'type'> {
   id: Statistic;
}

export const StatisticIcon = ({ id, ...rest }: StatisticIconProps) => {
   const icons: Record<string, React.ReactNode> = {
      'vitality_+f': <StatisticBaseIcon {...rest} color="vitality" type="plus" path="vitality" />,
      'vitality_+%': (
         <StatisticBaseIcon {...rest} color="vitality" type="percent" path="vitality" />
      ),
      'vitality_+x%': <StatisticBaseIcon {...rest} color="vitality" type="more" path="vitality" />,
      'vitality_-f': <StatisticBaseIcon {...rest} color="vitality" path="vitality" />,
      'vitality_-%': <StatisticBaseIcon {...rest} color="vitality" path="vitality" />,
      'vitality_-x%': <StatisticBaseIcon {...rest} color="vitality" path="vitality" />,

      'magicShield_+f': (
         <StatisticBaseIcon {...rest} color="magicShield" type="plus" path="magicShield" />
      ),
      'magicShield_+%': (
         <StatisticBaseIcon {...rest} color="magicShield" type="percent" path="magicShield" />
      ),
      'magicShield_+x%': (
         <StatisticBaseIcon {...rest} color="magicShield" type="more" path="magicShield" />
      ),
      'magicShield_-f': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" />,
      'magicShield_-%': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" />,
      'magicShield_-x%': <StatisticBaseIcon {...rest} color="magicShield" path="magicShield" />,

      'strength_+%': (
         <StatisticBaseIcon {...rest} color="strength" type="percent" path="strength" />
      ),
      'strength_+f': <StatisticBaseIcon {...rest} color="strength" type="plus" path="strength" />,
      'strength_+x%': <StatisticBaseIcon {...rest} color="strength" type="more" path="strength" />,
      'strength_-f': <StatisticBaseIcon {...rest} color="strength" path="strength" />,
      'strength_-%': <StatisticBaseIcon {...rest} color="strength" path="strength" />,
      'strength_-x%': <StatisticBaseIcon {...rest} color="strength" path="strength" />,

      'dexterity_+f': (
         <StatisticBaseIcon {...rest} color="dexterity" type="plus" path="dexterity" />
      ),
      'dexterity_+%': (
         <StatisticBaseIcon {...rest} color="dexterity" type="percent" path="dexterity" />
      ),
      'dexterity_+x%': (
         <StatisticBaseIcon {...rest} color="dexterity" type="more" path="dexterity" />
      ),
      'dexterity_-f': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" />,
      'dexterity_-%': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" />,
      'dexterity_-x%': <StatisticBaseIcon {...rest} color="dexterity" path="dexterity" />,

      'intelligence_+f': (
         <StatisticBaseIcon {...rest} color="intelligence" type="plus" path="intelligence" />
      ),
      'intelligence_+%': (
         <StatisticBaseIcon {...rest} color="intelligence" type="percent" path="intelligence" />
      ),
      'intelligence_+x%': (
         <StatisticBaseIcon {...rest} color="intelligence" type="more" path="intelligence" />
      ),
      'intelligence_-f': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" />,
      'intelligence_-%': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" />,
      'intelligence_-x%': <StatisticBaseIcon {...rest} color="intelligence" path="intelligence" />,

      'luck_+f': <StatisticBaseIcon {...rest} color="luck" type="plus" path="luck" />,
      'luck_+%': <StatisticBaseIcon {...rest} color="luck" type="percent" path="luck" />,
      'luck_+x%': <StatisticBaseIcon {...rest} color="luck" type="more" path="luck" />,
      'luck_-f': <StatisticBaseIcon {...rest} color="luck" path="luck" />,
      'luck_-%': <StatisticBaseIcon {...rest} color="luck" path="luck" />,
      'luck_-x%': <StatisticBaseIcon {...rest} color="luck" path="luck" />,

      'earthDamages_+f': (
         <StatisticBaseIcon {...rest} color="earthDamages" type="plus" path="strength" />
      ),
      'earthDamages_+%': (
         <StatisticBaseIcon {...rest} color="earthDamages" type="percent" path="strength" />
      ),
      'earthDamages_+x%': (
         <StatisticBaseIcon {...rest} color="earthDamages" type="more" path="strength" />
      ),
      'earthDamages_-f': <StatisticBaseIcon {...rest} color="earthDamages" path="strength" />,
      'earthDamages_-%': <StatisticBaseIcon {...rest} color="earthDamages" path="strength" />,
      'earthDamages_-x%': <StatisticBaseIcon {...rest} color="earthDamages" path="strength" />,

      'windDamages_+f': (
         <StatisticBaseIcon {...rest} color="windDamages" type="plus" path="dexterity" />
      ),
      'windDamages_+%': (
         <StatisticBaseIcon {...rest} color="windDamages" type="percent" path="dexterity" />
      ),
      'windDamages_+x%': (
         <StatisticBaseIcon {...rest} color="windDamages" type="more" path="dexterity" />
      ),
      'windDamages_-f': <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" />,
      'windDamages_-%': <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" />,
      'windDamages_-x%': <StatisticBaseIcon {...rest} color="windDamages" path="dexterity" />,

      'fireDamages_+f': (
         <StatisticBaseIcon {...rest} color="fireDamages" type="plus" path="intelligence" />
      ),
      'fireDamages_+%': (
         <StatisticBaseIcon {...rest} color="fireDamages" type="percent" path="intelligence" />
      ),
      'fireDamages_+x%': (
         <StatisticBaseIcon {...rest} color="fireDamages" type="more" path="intelligence" />
      ),
      'fireDamages_-f': <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" />,
      'fireDamages_-%': <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" />,
      'fireDamages_-x%': <StatisticBaseIcon {...rest} color="fireDamages" path="intelligence" />,

      'iceDamages_+f': <StatisticBaseIcon {...rest} color="iceDamages" type="plus" path="luck" />,
      'iceDamages_+%': (
         <StatisticBaseIcon {...rest} color="iceDamages" type="percent" path="luck" />
      ),
      'iceDamages_+x%': <StatisticBaseIcon {...rest} color="iceDamages" type="more" path="luck" />,
      'iceDamages_-f': <StatisticBaseIcon {...rest} color="iceDamages" path="luck" />,
      'iceDamages_-%': <StatisticBaseIcon {...rest} color="iceDamages" path="luck" />,
      'iceDamages_-x%': <StatisticBaseIcon {...rest} color="iceDamages" path="luck" />,

      'sword1HDamages_+f': (
         <StatisticBaseIcon {...rest} color="sword1HDamages" type="plus" path="sword1H" />
      ),
      'sword1HDamages_+%': (
         <StatisticBaseIcon {...rest} color="sword1HDamages" type="percent" path="sword1H" />
      ),
      'sword1HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="sword1HDamages" type="more" path="sword1H" />
      ),
      'sword1HDamages_-f': <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" />,
      'sword1HDamages_-%': <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" />,
      'sword1HDamages_-x%': <StatisticBaseIcon {...rest} color="sword1HDamages" path="sword1H" />,

      'axe1HDamages_+f': (
         <StatisticBaseIcon {...rest} color="axe1HDamages" type="plus" path="axe1H" />
      ),
      'axe1HDamages_+%': (
         <StatisticBaseIcon {...rest} color="axe1HDamages" type="percent" path="axe1H" />
      ),
      'axe1HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="axe1HDamages" type="more" path="axe1H" />
      ),
      'axe1HDamages_-f': <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" />,
      'axe1HDamages_-%': <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" />,
      'axe1HDamages_-x%': <StatisticBaseIcon {...rest} color="axe1HDamages" path="axe1H" />,

      'mace1HDamages_+f': (
         <StatisticBaseIcon {...rest} color="mace1HDamages" type="plus" path="mace1H" />
      ),
      'mace1HDamages_+%': (
         <StatisticBaseIcon {...rest} color="mace1HDamages" type="percent" path="mace1H" />
      ),
      'mace1HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="mace1HDamages" type="more" path="mace1H" />
      ),
      'mace1HDamages_-f': <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" />,
      'mace1HDamages_-%': <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" />,
      'mace1HDamages_-x%': <StatisticBaseIcon {...rest} color="mace1HDamages" path="mace1H" />,

      'daggerDamages_+f': (
         <StatisticBaseIcon {...rest} color="daggerDamages" type="plus" path="dagger" />
      ),
      'daggerDamages_+%': (
         <StatisticBaseIcon {...rest} color="daggerDamages" type="percent" path="dagger" />
      ),
      'daggerDamages_+x%': (
         <StatisticBaseIcon {...rest} color="daggerDamages" type="more" path="dagger" />
      ),
      'daggerDamages_-f': <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" />,
      'daggerDamages_-%': <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" />,
      'daggerDamages_-x%': <StatisticBaseIcon {...rest} color="daggerDamages" path="dagger" />,

      'wandDamages_+f': <StatisticBaseIcon {...rest} color="wandDamages" type="plus" path="wand" />,
      'wandDamages_+%': (
         <StatisticBaseIcon {...rest} color="wandDamages" type="percent" path="wand" />
      ),
      'wandDamages_+x%': (
         <StatisticBaseIcon {...rest} color="wandDamages" type="more" path="wand" />
      ),
      'wandDamages_-f': <StatisticBaseIcon {...rest} color="wandDamages" path="wand" />,
      'wandDamages_-%': <StatisticBaseIcon {...rest} color="wandDamages" path="wand" />,
      'wandDamages_-x%': <StatisticBaseIcon {...rest} color="wandDamages" path="wand" />,

      'sword2HDamages_+f': (
         <StatisticBaseIcon {...rest} color="sword2HDamages" type="plus" path="sword2H" />
      ),
      'sword2HDamages_+%': (
         <StatisticBaseIcon {...rest} color="sword2HDamages" type="percent" path="sword2H" />
      ),
      'sword2HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="sword2HDamages" type="more" path="sword2H" />
      ),
      'sword2HDamages_-f': <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" />,
      'sword2HDamages_-%': <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" />,
      'sword2HDamages_-x%': <StatisticBaseIcon {...rest} color="sword2HDamages" path="sword2H" />,

      'axe2HDamages_+f': (
         <StatisticBaseIcon {...rest} color="axe2HDamages" type="plus" path="axe2H" />
      ),
      'axe2HDamages_+%': (
         <StatisticBaseIcon {...rest} color="axe2HDamages" type="percent" path="axe2H" />
      ),
      'axe2HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="axe2HDamages" type="more" path="axe2H" />
      ),
      'axe2HDamages_-f': <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" />,
      'axe2HDamages_-%': <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" />,
      'axe2HDamages_-x%': <StatisticBaseIcon {...rest} color="axe2HDamages" path="axe2H" />,

      'mace2HDamages_+f': (
         <StatisticBaseIcon {...rest} color="mace2HDamages" type="plus" path="mace2H" />
      ),
      'mace2HDamages_+%': (
         <StatisticBaseIcon {...rest} color="mace2HDamages" type="percent" path="mace2H" />
      ),
      'mace2HDamages_+x%': (
         <StatisticBaseIcon {...rest} color="mace2HDamages" type="more" path="mace2H" />
      ),
      'mace2HDamages_-f': <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" />,
      'mace2HDamages_-%': <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" />,
      'mace2HDamages_-x%': <StatisticBaseIcon {...rest} color="mace2HDamages" path="mace2H" />,

      'bowDamages_+f': <StatisticBaseIcon {...rest} color="bowDamages" type="plus" path="bow" />,
      'bowDamages_+%': <StatisticBaseIcon {...rest} color="bowDamages" type="percent" path="bow" />,
      'bowDamages_+x%': <StatisticBaseIcon {...rest} color="bowDamages" type="more" path="bow" />,
      'bowDamages_-f': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" />,
      'bowDamages_-%': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" />,
      'bowDamages_-x%': <StatisticBaseIcon {...rest} color="bowDamages" path="bow" />,

      'staffDamages_+f': (
         <StatisticBaseIcon {...rest} color="staffDamages" type="plus" path="staff" />
      ),
      'staffDamages_+%': (
         <StatisticBaseIcon {...rest} color="staffDamages" type="percent" path="staff" />
      ),
      'staffDamages_+x%': (
         <StatisticBaseIcon {...rest} color="staffDamages" type="more" path="staff" />
      ),
      'staffDamages_-f': <StatisticBaseIcon {...rest} color="staffDamages" path="staff" />,
      'staffDamages_-%': <StatisticBaseIcon {...rest} color="staffDamages" path="staff" />,
      'staffDamages_-x%': <StatisticBaseIcon {...rest} color="staffDamages" path="staff" />,

      'earthResistance_+f': (
         <StatisticBaseIcon {...rest} color="earthResistance" type="resistances" path="strength" />
      ),
      'earthResistance_+%': (
         <StatisticBaseIcon {...rest} color="earthResistance" type="resistances" path="strength" />
      ),
      'windResistance_+f': (
         <StatisticBaseIcon {...rest} color="windResistance" type="resistances" path="dexterity" />
      ),
      'windResistance_+%': (
         <StatisticBaseIcon {...rest} color="windResistance" type="resistances" path="dexterity" />
      ),
      'fireResistance_+f': (
         <StatisticBaseIcon
            {...rest}
            color="fireResistance"
            type="resistances"
            path="intelligence"
         />
      ),
      'fireResistance_+%': (
         <StatisticBaseIcon
            {...rest}
            color="fireResistance"
            type="resistances"
            path="intelligence"
         />
      ),
      'iceResistance_+f': (
         <StatisticBaseIcon {...rest} color="iceResistance" type="resistances" path="luck" />
      ),
      'iceResistance_+%': (
         <StatisticBaseIcon {...rest} color="iceResistance" type="resistances" path="luck" />
      ),

      'initiative_+f': (
         <StatisticBaseIcon {...rest} color="initiative" type="plus" path="initiative" />
      ),
      'precision_+f': (
         <StatisticBaseIcon {...rest} color="precision" type="plus" path="precision" />
      ),
      'precision_+%': (
         <StatisticBaseIcon {...rest} color="precision" type="percent" path="precision" />
      ),
      'evasion_+f': <StatisticBaseIcon {...rest} color="evasion" type="plus" path="evasion" />,
      'evasion_+%': <StatisticBaseIcon {...rest} color="evasion" type="percent" path="evasion" />,

      'lifeSteal_+f': (
         <StatisticBaseIcon {...rest} color="lifeSteal" type="plus" path="lifeSteal" />
      ),
      'lifeSteal_+%': (
         <StatisticBaseIcon {...rest} color="lifeSteal" type="percent" path="lifeSteal" />
      ),

      'criticalStrikeChance_+f': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeChance"
            type="plus"
            path="criticalStrike"
         />
      ),
      'criticalStrikeChance_+%': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeChance"
            type="percent"
            path="criticalStrike"
         />
      ),
      'criticalStrikeDamages_+%': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeDamages"
            type="damages"
            path="criticalStrike"
         />
      ),
      'criticalStrikeResistance_+f': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeResistance"
            type="plus"
            path="criticalStrikeResistance"
         />
      ),
      'criticalStrikeResistance_+%': (
         <StatisticBaseIcon
            {...rest}
            color="criticalStrikeResistance"
            type="percent"
            path="criticalStrikeResistance"
         />
      ),

      'areaOfEffect_+%': (
         <StatisticBaseIcon {...rest} color="areaOfEffect" type="percent" path="areaOfEffect" />
      ),

      'thornsPhysical_+%': (
         <StatisticBaseIcon {...rest} color="thornsPhysical" type="percent" path="thornsPhysical" />
      ),
      'thornsMagical_+%': (
         <StatisticBaseIcon {...rest} color="thornsMagical" type="percent" path="thornsMagical" />
      ),
      'prospect_+f': <StatisticBaseIcon {...rest} color="prospect" type="plus" path="prospect" />,
      'elementalDamages_+f': (
         <StatisticBaseIcon
            {...rest}
            color="elementalDamages"
            type="plus"
            path="elementalDamages"
         />
      ),
      'elementalResistances_+f': (
         <StatisticBaseIcon
            {...rest}
            color="elementalResistances"
            type="resistances"
            path="elementalResistances"
         />
      ),
   } satisfies Partial<Record<Statistic, React.ReactNode>>;

   return icons[id] || null;
};
