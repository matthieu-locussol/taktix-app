import type { SvgIconProps, Theme } from '@mui/material';
import type { Badge } from '../badges/Badges';
import type { StatisticPath } from './statisticsPaths';

import { useTheme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import { Badges } from '../badges/Badges';

import { statisticsPaths } from './statisticsPaths';

interface StatisticBaseIconProps extends Omit<SvgIconProps, 'type' | 'color'> {
   color?: keyof Theme['palette']['statisticsColors'];
   path: StatisticPath;
   type?: Badge;
}

export const StatisticBaseIcon = ({ color, path, type, ...rest }: StatisticBaseIconProps) => {
   const theme = useTheme();

   return (
      <SvgIcon viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...rest}>
         <g transform="translate(0,0)">
            <path
               d={statisticsPaths[path]}
               fill={color ? theme.palette.statisticsColors[color] : theme.palette.badges.color}
               fillOpacity="1"
            />
         </g>
         <Badges id={type} />
      </SvgIcon>
   );
};
