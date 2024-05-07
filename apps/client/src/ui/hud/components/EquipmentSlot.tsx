import { BoxProps } from '@mui/material';
import { forwardRef, useMemo } from 'react';
import { Item } from 'shared/src/types/Item';
import { ItemMgt } from 'shared/src/utils/ItemMgt';
import { ItemBaseIcon } from '../../components/items/ItemBaseIcon';
import { ItemSlot } from './ItemSlot';
import { ItemTooltip } from './ItemTooltip';

interface EquipmentSlotProps extends BoxProps {
   size: 'tiny' | 'small' | 'medium' | 'large' | 'wide';
   item: Item | null;
   canBeHovered?: boolean;
}

export const EquipmentSlot = forwardRef<HTMLDivElement, EquipmentSlotProps>(
   ({ size, item, canBeHovered = false, ...rest }, ref) => {
      const { width, height } = {
         tiny: { width: 'min(2vw, 3vh)', height: 'min(2vw, 3vh)' },
         small: { width: 'min(3vw, 4.5vh)', height: 'min(3vw, 4.5vh)' },
         medium: { width: 'min(6vw, 9vh)', height: 'min(6vw, 9vh)' },
         large: { width: 'min(6vw, 9vh)', height: 'min(12vw, 18vh)' },
         wide: { width: 'calc(min(6vw, 9vh) + min(1vw, 1.5vh))', height: 'min(3vw, 4.5vh)' },
      }[size];

      const rarity = useMemo(() => {
         if (item !== null) {
            return ItemMgt.getRarity(item);
         }
      }, [item]);

      if (item === null) {
         return (
            <ItemSlot
               ref={ref}
               canBeHovered={canBeHovered}
               {...rest}
               width={width}
               height={height}
            />
         );
      }

      return (
         <ItemTooltip
            item={item}
            placement="top"
            enterDelay={300}
            enterNextDelay={300}
            disableInteractive
         >
            <ItemSlot ref={ref} canBeHovered={canBeHovered} {...rest} width={width} height={height}>
               <ItemBaseIcon
                  path={item.type}
                  color={rarity}
                  sx={{
                     width: `calc(${width} / 1.5)`,
                     height: `calc(${height} / 1.5)`,
                  }}
               />
            </ItemSlot>
         </ItemTooltip>
      );
   },
);
