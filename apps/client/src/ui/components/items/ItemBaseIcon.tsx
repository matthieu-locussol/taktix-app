import { SvgIconProps, useTheme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { ItemRarity, ItemType } from 'shared/src/types/Item';
import { itemsPaths } from './itemsPaths';

interface ItemBaseIconProps extends Omit<SvgIconProps, 'color'> {
   color?: ItemRarity;
   path: ItemType;
}

export const ItemBaseIcon = ({ color, path, ...rest }: ItemBaseIconProps) => {
   const theme = useTheme();

   return (
      <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...rest}>
         <g transform="translate(0,0)">
            <path
               d={itemsPaths[path]}
               fill={color ? theme.palette.item[color] : theme.palette.item.common}
               fillOpacity="1"
            ></path>
         </g>
      </SvgIcon>
   );
};
