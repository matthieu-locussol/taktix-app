import { SvgIconProps, Theme, useTheme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { Badge, Badges } from '../badges/Badges';
import { StatisticPath, statisticsPaths } from './statisticsPaths';

interface StatisticBaseIconProps extends Omit<SvgIconProps, 'type' | 'color'> {
   color?: keyof Theme['palette']['statisticsColors'];
   path: StatisticPath;
   type?: Badge;
}

export const StatisticBaseIcon = ({ color, path, type, ...rest }: StatisticBaseIconProps) => {
   const theme = useTheme();

   return (
      <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...rest}>
         <g transform="translate(0,0)">
            <path
               d={statisticsPaths[path]}
               fill={color ? theme.palette.statisticsColors[color] : theme.palette.badges.color}
               fillOpacity="1"
            ></path>
         </g>
         <Badges id={type} />
      </SvgIcon>
   );
};
